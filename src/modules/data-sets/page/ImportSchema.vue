<template>
  <div class="row">
    <q-select
      dense
      outlined
      use-input
      clearable
      label="OCA Schema"
      v-model="selected"
      :options="options"
      :option-label="s => !!s ? `${s.namespace} / ${s.schemaName}`: ''"
      @filter="filter"
      @update:model-value="newSchemaSelected"
      style="width: 450px"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>

      <template v-slot:after>
        <q-btn
          :disable="!selected || !forms[selected.DRI]"
          round
          dense
          flat
          icon="preview"
          @click="preview"
        />
      </template>
    </q-select>

    <q-btn
      :disable="!selected"
      class="import-btn"
      size="md"
      dense
      color="primary"
      @click="import"
      label="Import"
    />
  </div>

  <preview-component
    ref="PreviewComponent"
    :readonly="true"
    :form="form"
    :alternatives="alternatives"
  />
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Options } from 'vue-class-component'
import { renderForm, PreviewComponent } from '../../../js/oca.js-vue'

@Options({
  components: {
    PreviewComponent
  }
})
export default class ImportSchema extends Vue {
  options = []
  selected = null
  form = {}
  alternatives = []
  forms = []
  formsAlt = []

  async created() {
    await this.initOptions()
  }

  filter (val, update) {
    if (val === '') {
      update(async () => { await this.initOptions() })
      return
    }
    update(async () => { await this.fetchOptions(val) })
  }

  async newSchemaSelected (val) {
    if (!val) { return }
    await this.generatePreview(val.DRI)
  }

  async import () {
    await this.$api.post('/oca', {
      dri: this.selected.DRI
    })
    this.$emit('imported')
    this.selected = null
  }

  preview () {
    this.form = this.forms[this.selected.DRI]
    this.alternatives = this.formsAlt[this.selected.DRI]
    this.$refs.PreviewComponent.openModal(this.form)
  }

  async initOptions () {
    const results = (await this.$ocaRepoApi.get(
      '/api/v2/schemas?_index=schema_base&limit=50'
    )).data
    this.options = results.map(result => {
      return {
        namespace: result.namespace,
        DRI: result.DRI,
        schemaName: result.schema.name
      }
    })
  }

  async fetchOptions (suggest: string) {
    const results = (await this.$ocaRepoApi.get(
      `/api/v2/schemas?suggest=${suggest}`
    )).data
    this.options = results.map(result => {
      return {
        namespace: result.namespace,
        DRI: result.DRI,
        schemaName: result.schema.name
      }
    })
  }

  async generatePreview (dri: string) {
    if (this.forms[dri]) { return }

    const branchDri = (
      await this.$ocaRepoApi.get(`/api/v3/schemas?q=${dri}`)
    ).data[0].DRI
    const branch = (
      await this.$ocaRepoApi.get(`/api/v3/schemas/${branchDri}`)
    ).data
    const langBranches = this.splitBranchPerLang(branch)

    this.formsAlt[dri] = await Promise.all(
      langBranches.map(async langBranch => ({
        language: langBranch.lang,
        form: (await renderForm(
          [langBranch.branch.schema_base, ...langBranch.branch.overlays],
          branchDri
        )).form
      }))
    )
    this.forms[dri] = this.formsAlt[dri][0].form
  }

  splitBranchPerLang (branch) {
    const langBranches = []
    const labelOverlays = branch.overlays.filter(o => o.type.includes("label"))
    const languages = labelOverlays.map(o => o.language)
    const schemaBase = branch.schema_base
    languages.forEach(lang => {
      langBranches.push({
        lang: lang,
        branch: {
          schema_base: schemaBase,
          overlays: branch.overlays.filter(o => {
            if(!o.language) { return true }
            return o.language == lang
          })
        }
      })
    })
    return langBranches
  }
}
</script>

<style lang="scss" scoped>
.import-btn {
  padding: 0 10px 0 10px;
  margin-left: 20px;
}
</style>
