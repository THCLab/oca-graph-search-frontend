<template>
  <div class="q-pa-md">
    <div v-if="entities.length === 0">
      No results
    </div>

    <div
      v-else
      class="results"
    >
      <span class="results__label">
        Results ({{ entities.length }}):
      </span>
      <div class="results__list">
        <div
          class="results__list__el"
          v-for="entity in entities"
          :key="entity.id"
        >
          id: <b>{{ entity.id }}</b> <br>
          <span
            v-for="(datum, i) in entity.data"
            :key="i"
          >
            {{ datum.name }}: <b>{{ datum.value }}</b>
            <span v-if="i !== entity.data.length - 1">
              &bull;
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Entity } from '../entities/Entity'

class Props {
  entities: Entity[] = []
}

export default class Results extends Vue.with(Props) {
}
</script>

<style lang="scss" scoped>
.results__list {
  padding: 5px 0 0 10px;

  &__el {
    padding: 5px 0 5px 5px;
    border: 2px none $grey-4;
    border-bottom-style: solid;
  }
}
</style>
