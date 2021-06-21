<template>
  <q-page class="q-pa-md">
    <div
      class="row justify-center"
      style="margin-top: 20px;"
    >
      <q-card>
        <criteria @search-performed="updateResults" />
      </q-card>
    </div>
    <div
      class="row justify-center"
      style="margin-top: 20px;"
    >
      <q-card style="min-width: 50vw;">
        <results :entities="results" />
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Entity } from '../entities/Entity'
import Criteria from './Criteria.vue'
import Results from './Results.vue'

@Options({
  components: {
    Criteria,
    Results
  }
})
export default class SearchIndex extends Vue {
  results: Entity[] = []

  updateResults (results: Entity[]) {
    this.results = results
  }
}
</script>
