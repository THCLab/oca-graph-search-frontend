<template>
  <div>
    <select2-control v-if="!control.isMultiple"
                     v-model="control.value"
                     :isValid="isValid"
                     :label="control.label"
                     :disabled="control.readonly"
                     :options="dataSource">
      <template v-slot:errors><slot name="errors"/></template>
    </select2-control>
    <select2-multiple-control v-else
                              v-model="control.value"
                              :isValid="isValid"
                              :label="control.label"
                              :disabled="control.readonly"
                              :options="dataSource">
      <template v-slot:errors><slot name="errors"/></template>
    </select2-multiple-control>

    <slot name="information"/>

    <!-- TODO: ADD SUPPORT!!?? -->
    <!-- <div class="form-group" v-else> -->
    <!--   <label> {{control.label}} </label> -->
    <!--   <span v-show="control.required"> *</span> -->
    <!--   <select2-control v-if="!control.isMultiple" -->
    <!--                    v-model="control.value" -->
    <!--                    :disabled="this.control.readonly" -->
    <!--                    :options="dataSource"> -->
    <!--   </select2-control> -->
    <!--   <select2-multiple-control v-else -->
    <!--                             v-model="control.value" -->
    <!--                             :disabled="this.control.readonly" -->
    <!--                             :options="dataSource"> -->
    <!--   </select2-multiple-control> -->
    <!-- </div> -->
  </div>
</template>

<script>
import {Hooks} from '../../../../oca.js-vue/gui/components/hook_lists';
// import { EventHandlerConstant, eventBus } from '../../../../oca.js-vue/template/handler/event_handler'
import Select2Control from "../../../../oca.js-vue/third_party_controls/Select2Control";
import Select2MultipleControl from "../../../../oca.js-vue/third_party_controls/Select2MultipleControl";

export default {
  name: "SelectControl",
  components: {
    Select2MultipleControl,
    Select2Control
  },
  props:['control', 'isValid', 'labelPosition'],
  data: () => ({
    dataSource: [],
  }),
  created() {
    // request for ajax source
    if (this.control.isAjax) {
      /*
      let self = this;
      $.getJSON(this.control.ajaxDataUrl)
        .done(data => {
          if (_.isArray(data)) {
            self.dataSource = data;
          } else {
            eventBus.$emit(
              EventHandlerConstant.ERROR,
              `Control data error: ${this.control.label}.`
            )
            console.error(`Data for select control of ${this.control.label} is wrong format!`);
          }
        })
        .fail(err => {
          eventBus.$emit(
            EventHandlerConstant.ERROR,
            `Failed to load data for control: ${this.control.label}.`
          )
          console.error("Request for Select Data Source Failed: ", err);
        });
          */
    } else {
      this.dataSource = this.control.dataOptions.map(o => ({
        value: o.id,
        label: o.text
      }));
    }
  },
  watch: {
    'control.dataOptions': {
      handler() {
        this.dataSource = this.control.dataOptions;
      }
    }
  },
  mounted() {
    if (!_.isEmpty(this.control.defaultValue)) {
      if (this.control.isMultiple) {
        this.control.value = [this.control.defaultValue];
      } else {
        this.control.value = this.control.defaultValue;
      }
    }

    // after hook
    // Hooks.Control.afterInit.run(this.control, $(this.$el).find("select.form-control"));
  }
}
</script>

<style scoped>

</style>
