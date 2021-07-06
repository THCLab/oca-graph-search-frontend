type Operator = {
  type: string,
  value: string
}

export class CriteriumDatum {
  name: string
  value: number | string
  operator: Operator

  constructor (name: string, value: number | string, operator: Operator) {
    this.name = name
    this.value = value
    this.operator = operator
  }
}
