<template>
  <div class="q-gutter-md row">
    <q-select
      dense
      outlined
      v-model="name"
      :options="available.names"
      style="width: 250px"
    />
    <q-select
      :disable="!name"
      dense
      outlined
      v-model="operator"
      :options="available.operators"
      style="width: 250px"
    />
    <q-select
      :disable="!name"
      dense
      outlined
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      @input-value="setCriteriumValue"
      :model-value="value"
      :options="available.values"
      style="width: 250px"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Watch } from 'vue-property-decorator'

type Value = string | number
type Available = {
  names: string[]
  operators: string[]
  values: Value[]
}

export default class Criterium extends Vue {
  name = ''
  operator = ''
  value: string | number = ''

  available: Available = {
    names: [],
    operators: [],
    values: []
  }

  async created () {
    this.available.names = ((
      await this.$api.get('/meta')
    ).data as { results: string[] }).results.sort()
  }

  @Watch('name')
  async onCriteriumNameChanged (name: string) {
    this.operator = ''
    this.value = ''
    const result = (
      await this.$api.get(`/meta/${name}`)
    ).data as Available
    this.available.operators = result.operators
    this.operator = this.available.operators[0]
    this.available.values = result.values.sort().map((v: Value) => (isNaN(v as any) ? v : Number(v)))
  }

  setCriteriumValue (val: string) {
    if (isNaN(this.available.values[0] as any)) {
      this.value = val
    } else {
      if (isNaN(val as any)) { return }
      this.value = Number(val)
    }
  }
}
</script>
