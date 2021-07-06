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
      :option-label="o => o.value"
      :options="available.operators"
      style="width: 250px"
    />
    <q-select
      :disable="!operator.type"
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

type Value = any
type Operator = {
  type: string,
  value: string
}
type Available = {
  names: string[]
  operators: Operator[]
  values: Value[]
}

export default class CriteriumDatum extends Vue {
  name = ''
  operator: Operator = { type: '', value: '' }
  value: string | number = ''

  available: Available = {
    names: [],
    operators: [],
    values: []
  }

  async created () {
    this.available.names = ((
      await this.$api.get('/data/names')
    ).data as { results: string[] }).results.sort()
  }

  @Watch('name')
  async onCriteriumNameChanged (name: string) {
    this.available.operators = []
    this.operator = { type: '', value: '' }
    this.value = ''
    const results = (
      await this.$api.get(`/datum/${name}/operators`)
    ).data as { type: string, operators: string[] }[]
    results.forEach(result => {
      this.available.operators.push(...result.operators.map(op => {
        return { type: result.type, value: op }
      }))
    })
    this.operator = this.available.operators[0]
  }

  @Watch('operator')
  async onCriteriumOperatorChanged (newOp: Operator, oldOp: Operator) {
    if (!newOp.type || newOp.type === oldOp.type) { return }
    this.value = ''
    const results = (
      await this.$api.get(`/datum/${this.name}/values/${newOp.type}`)
    ).data as { values: any[] }
    this.available.values = results.values.sort()
  }

  setCriteriumValue (val: string) {
    if (this.operator.type === 'Number') {
      if (isNaN(val as any)) { return }
      this.value = Number(val)
      return
    }

    this.value = val
  }
}
</script>
