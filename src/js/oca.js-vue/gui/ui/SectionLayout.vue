<template>
  <div class="q-pb-sm">
    <div class="formItem">
      <div class="title">
        {{section.label}}
      </div>

      <div :id="section.name + '_gui_body'" class="collapseBody collapse show">
        <row-component :section="section" :key="section.name"></row-component>
      </div>
    </div>
  </div>
</template>

<script>
import RowComponent from "./RowComponent";
import {Hooks} from '../../../oca.js-vue/gui/components/hook_lists';

export default {
  name: "SectionLayout",
  components: {
    RowComponent
  },
  props: ['section'],
  created() {
    // before hook
    Hooks.Section.beforeRegister.run(this.section);
  },
  mounted() {
    // after hook
    Hooks.Section.afterRegister.run(this.section);
  },

}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}

.formItem .title {
  font-weight: bold;
  border-bottom: 1px solid #000;
}
</style>
