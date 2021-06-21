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
        <criterium :ref="setCriteriumRef" />
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
import { Criterium } from '../entities/Criterium'
import { Entity } from '../entities/Entity'
import CriteriumComponent from './Criteria/Criterium.vue'

type CriteriumElement = {
  type: string,
  deleted: boolean
}

@Options({
  components: {
    Criterium: CriteriumComponent
  }
})
export default class Criteria extends Vue {
  defaultCrtiterium: CriteriumElement = { type: 'meta', deleted: false }
  criteriumRefs: Criterium[] = []
  criteriumList: CriteriumElement[] = []

  setCriteriumRef (ref: Criterium) {
    if (ref) {
      this.criteriumRefs.push(ref)
    }
  }

  created () {
    this.addCriterium()
  }

  beforeUpdate () {
    this.criteriumRefs = []
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

  async search () {
    const results: Entity[] = ((await this.$api.get('/q', {
      params: {
        params: this.criteriumRefs.map(criterium => {
          return {
            name: criterium.name,
            value: criterium.value,
            op: criterium.operator
          }
        })
      }
    })).data as { results: Entity[] }).results || []

    this.$emit('searchPerformed', results)
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
