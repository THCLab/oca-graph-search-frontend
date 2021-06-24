<template>
  <div class="q-gutter-md row">
    <q-select
      dense
      outlined
      v-model="name"
      :options="available.names"
      style="width: 250px"
    />
    <div class="mock" />
    <div class="mock" />
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

type Available = {
  names: string[]
}

export default class CriteriumSchema extends Vue {
  name = ''

  available: Available = {
    names: []
  }

  async created () {
    this.available.names = ((
      await this.$api.get('/oca/names')
    ).data as { results: string[] }).results.sort()
  }
}
</script>

<style lang="scss" scoped>
.mock {
  width: 250px;
  height: 0;
  padding-right: 15px;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
