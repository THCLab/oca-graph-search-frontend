<template>
  <div class="q-gutter-md row">
    <q-input
      dense
      outlined
      v-model="name"
      style="width: 250px"
    />
    <div class="mock" />
    <div class="mock" />
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class CriteriumAttribute extends Vue {
  name = ''
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
