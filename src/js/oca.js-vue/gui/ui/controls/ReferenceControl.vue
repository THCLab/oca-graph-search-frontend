<template>
  <div>
    <!-- <slot name="label"/> -->

    <div class="form-preview">
      <div class="form-preview__header">
        <q-toolbar-title class="row ">
          <span class="text-weight-bold col-md-7 offset-md-1"> 
            <slot name="label"/>
            <!-- {{ form.label }} --> 
          </span>
        <!-- <q-select v-model="selectedLang" :options="alternatives"> -->
        <!--   <template v-slot:option="scope"> -->
        <!--     {{scope.opt.language}} -->
        <!--   </template> -->
        <!-- </q-select> -->

          <select
            class="form-control col-md-3"
            v-model="selectedLang">
            <option v-for="alt in alternatives">{{alt.language}}</option>
          </select>
        </q-toolbar-title>
      </div>

      <form-builder-gui
        :selected-lang="selectedLang"
        :form="form"
        :alternatives="alternatives"
        :readonly="control.readonly"
        :key="control.referenceSchema.form.uuid"></form-builder-gui>
    </div>

    <slot name="errors"/>
    <slot name="information"/>

    <!-- <div v-else class="form-group"> -->
    <!--   <label> {{control.label}} </label> -->
    <!--   <span v-show="control.required"> *</span> -->

    <!--   <input type="text" -->
    <!--          class="form-control" -->
    <!--          :readonly="this.control.readonly" -->
    <!--          :name="control.fieldName" -->
    <!--          v-model="control.value" /> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import {Hooks} from '../../../../oca.js-vue/gui/components/hook_lists';

export default {
  name: "ReferenceControl",
  components: {
    FormBuilderGui: defineAsyncComponent({
      loader: () => import('../../FormBuilderGui.vue')
    })
  },
  props: ['control'],
  data() {
    return {
      form: this.control.referenceSchema.form,
      alternatives: this.control.referenceSchema.form.translations,
      selectedLang: this.control.referenceSchema.form.translations[0].language
    }
  },
  created() {
    if(this.control && this.control.readonly) {
        this.control.referenceSchema.form.readonly = true
        this.control.referenceSchema.form.sections.forEach( section => {
            section.row.controls.forEach(control => {
              if (control) {
                control.readonly = true
              }
            })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-preview {
    padding: 5px;

    &__header {
      padding-bottom: 10px;
    }
  }
</style>
