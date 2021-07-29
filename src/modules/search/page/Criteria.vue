<template>
  <div class="q-pa-md">
    <div
      v-for="(criterium, i) in criteriumList"
      :key="i"
    >
      <div
        v-if="!criterium.deleted"
        class="criterium row items-center"
      >
        <div
          class="criterium__remove-btn"
          @click="removeCriterium(i)"
        >
          <q-icon
            name="remove_circle_outline"
            size="sm"
          />
        </div>
        <q-select
          dense
          outlined
          v-model="criterium.type"
          :options="['datum', 'schema']"
          style="width: 150px; padding-right: 15px;"
        />
        <criterium-datum
          v-if="criterium.type === 'datum'"
          :ref="setCriteriumDatumRef"
        />
        <criterium-schema
          v-if="criterium.type === 'schema'"
          :ref="setCriteriumSchemaRef"
        />
      </div>
    </div>

    <div
      class="add-criterium-btn"
      @click="addCriterium"
    >
      <q-icon
        name="add_circle"
        size="sm"
      />
    </div>

    <div class="row justify-end">
      <q-btn
        rounded
        color="secondary"
        size="md"
        label="Search"
        @click="search"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-property-decorator'
import { CriteriumDatum } from '../entities/CriteriumDatum'
import { CriteriumSchema } from '../entities/CriteriumSchema'
import CriteriumDatumComponent from './Criteria/CriteriumDatum.vue'
import CriteriumSchemaComponent from './Criteria/CriteriumSchema.vue'

type CriteriumElement = {
  type: 'datum' | 'schema',
  deleted: boolean
}

@Options({
  components: {
    CriteriumDatum: CriteriumDatumComponent,
    CriteriumSchema: CriteriumSchemaComponent
  }
})
export default class Criteria extends Vue {
  defaultCrtiterium: CriteriumElement = { type: 'datum', deleted: false }
  criteriumList: CriteriumElement[] = []
  criteriumDatumRefs: CriteriumDatum[] = []
  criteriumSchemaRefs: CriteriumSchema[] = []

  setCriteriumDatumRef (ref: CriteriumDatum) {
    if (ref) {
      this.criteriumDatumRefs.push(ref)
    }
  }

  setCriteriumSchemaRef (ref: CriteriumSchema) {
    if (ref) {
      this.criteriumSchemaRefs.push(ref)
    }
  }

  created () {
    this.addCriterium()
  }

  beforeUpdate () {
    this.criteriumDatumRefs = []
    this.criteriumSchemaRefs = []
  }

  addCriterium () {
    this.criteriumList.push({ ...this.defaultCrtiterium })
  }

  removeCriterium (index: number) {
    if (this.criteriumList.filter(el => el.deleted === false).length === 1) {
      this.addCriterium()
    }
    this.criteriumList[index].deleted = true
  }

  search () {
    const params = {
      data: this.criteriumDatumRefs.filter(criterium => {
        return criterium.name && criterium.value
      }).map(criterium => {
        return {
          name: criterium.name,
          value: criterium.value,
          type: criterium.operator.type,
          op: criterium.operator.value
        }
      }),
      schemas: this.criteriumSchemaRefs.filter(criterium => {
        return criterium.name
      }).map(criterium => {
        return {
          name: criterium.name
        }
      })
    }

    this.$emit('searchClicked', params)
  }
}
</script>

<style lang="scss" scoped>
.criterium {
  padding: 0 0 10px 0;

  &__remove-btn {
    padding: 5px 10px 5px 0;
    cursor: pointer;
  }
}

.add-criterium-btn {
  padding: 5px 0 5px 0;
  width: min-content;
  cursor: pointer;
}
</style>
