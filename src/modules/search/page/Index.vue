<template>
  <q-page class="q-pa-md">
    <div
      class="row justify-center"
      style="margin-top: 20px;"
    >
      <q-card>
        <criteria @search-clicked="searchClicked" />
      </q-card>
    </div>
    <div
      class="row justify-center"
      style="margin-top: 15px;"
    >
      <q-card
        v-show="maxPages > 0"
        class="q-pa-xs"
      >
        <q-pagination
          v-model="currentPage"
          color="secondary"
          :max="maxPages"
          :max-pages="6"
          boundary-numbers
        />
      </q-card>
    </div>
    <div
      class="row justify-center"
      style="margin-top: 10px;"
    >
      <q-card style="min-width: 50vw;">
        <results
          :count="count"
          :entities="results"
        />
      </q-card>
    </div>
    <div
      class="row justify-center"
      style="margin-top: 10px;"
    >
      <q-card
        v-show="maxPages > 0"
        class="q-pa-xs"
      >
        <q-pagination
          v-model="currentPage"
          color="secondary"
          :max="maxPages"
          :max-pages="6"
          boundary-numbers
        />
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options, Watch } from 'vue-property-decorator'
import { Entity } from '../entities/Entity'
import Criteria from './Criteria.vue'
import Results from './Results.vue'

type Params = { data: any[], schemas: any[] }

@Options({
  components: {
    Criteria,
    Results
  }
})
export default class SearchIndex extends Vue {
  params: Params = { data: [], schemas: [] }
  count = 0
  results: Entity[] = []
  currentPage = 1
  resultsPerPage = 5
  maxPages = 0

  async searchClicked (params: Params) {
    this.params = params
    this.currentPage = 1
    const limit = this.resultsPerPage
    const offset = (this.currentPage - 1) * this.resultsPerPage
    await this.performSearch(this.params, limit, offset)
  }

  @Watch('currentPage')
  async currentPageChanged () {
    const limit = this.resultsPerPage
    const offset = (this.currentPage - 1) * this.resultsPerPage
    await this.performSearch(this.params, limit, offset)
  }

  async performSearch (params: Params, limit: number, offset: number) {
    const result = ((await this.$api.get('/q', {
      params: {
        ...params, limit, offset
      }
    })).data as { count: number, results: Entity[] })
    this.count = result.count || 0
    this.results = result.results || []
    this.maxPages = Math.ceil(this.count / this.resultsPerPage)
  }
}
</script>
