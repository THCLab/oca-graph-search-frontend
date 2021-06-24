export class Datum {
  name: string
  value: number | string

  constructor (name: string, value: number | string) {
    this.name = name
    this.value = value
  }
}
