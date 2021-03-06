<template>
  <q-page class="q-pa-md">
    <div
      class="row justify-center"
      style="margin-top: 20px;"
    >
      <q-card class="q-pa-md">
        <import-schema @imported="fetchOCAList" />
      </q-card>
    </div>

    <div
      class="row justify-center"
      style="margin-top: 20px;"
    >
      <q-table
        title="Data Sets"
        :rows="rows"
        :columns="columns"
        row-key="name"
        style="min-width: 1000px;"
      >
        <template #header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
            <q-th auto-width />
          </q-tr>
        </template>

        <template #body="props">
          <q-tr :props="props">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
            <q-td auto-width>
              <q-btn
                :disable="!forms[props.row.dri]"
                size="md"
                class="preview-btn"
                color="secondary"
                dense
                @click="preview(props.row.dri)"
                label="Preview"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>

  <preview-component
    ref="PreviewComponent"
    :readonly="true"
    :form="form"
    :alternatives="alternatives"
  />
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent } from 'vue'
import { Vue, Options } from 'vue-class-component'
import ImportSchema from './ImportSchema.vue'
import { OCAListEl } from '../entities/OCAListEl'
import { renderForm, PreviewComponent } from '../../../js/oca.js-vue'

@Options({
  components: {
    ImportSchema,
    PreviewComponent: (PreviewComponent as ReturnType<typeof defineComponent>)
  }
})
export default class DataSetsIndex extends Vue {
  columns = [
    {
      name: 'name',
      required: true,
      label: 'Schema',
      align: 'left',
      field: 'name',
      sortable: true
    },
    {
      name: 'entitiesCount',
      required: true,
      label: 'Entities',
      align: 'left',
      field: 'entitiesCount',
      sortable: true
    }
  ]

  rows: OCAListEl[] = []

  form = {}
  alternatives = []
  forms = []
  formsAlt = []

  async created () {
    await this.fetchOCAList()
  }

  async fetchOCAList () {
    this.rows = ((
      await this.$api.get('/oca/list')
    ).data as { results: OCAListEl[] }).results

    this.rows.forEach(async row => {
      await this.generatePreview(row.dri)
    })
  }

  preview (dri: string) {
    this.form = this.forms[dri]
    this.alternatives = this.formsAlt[dri]
    this.$refs.PreviewComponent.openModal(this.form)
  }

  async generatePreview (dri: string) {
    if (this.forms[dri]) { return }
    const branchDri = (await this.$ocaRepoApi.get(`/api/v3/schemas?q=${dri}`)).data[0].DRI
    const branch = (await this.$ocaRepoApi.get(`/api/v3/schemas/${branchDri}`)).data
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
.preview-btn {
  padding: 5px 10px 5px 10px;
}
</style>
