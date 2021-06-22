export class CriteriumMeta {
  name: string
  value: number | string
  operator: string

  constructor (name: string, value: number | string, operator: string) {
    this.name = name
    this.value = value
    this.operator = operator
  }
}
