<template>
  <div>
    <a v-if="control.attrType == 'URI' && control.readonly == true"
       target="_blank"
       :href="control.value">{{control.value}}</a>

    <div v-else>
      <q-input outlined v-if="showPii"
                        :class="{ 'is-invalid': !isValid }"
                        :label="control.label"
                        :dense=true
                        :readonly="control.readonly"
                        :name="control.fieldName"
                        v-model="control.value" >
        <template v-slot:append>
          <div class="input-group-append" v-if="control.isPII">
            <span class="input-group-text clickable" @click="triggerShow">
              <q-icon :name="icon" />
              <!-- <font-awesome-icon :icon="icon"></font-awesome-icon> -->
            </span>
          </div>
        </template>
      </q-input>

      <q-input v-else
                type="password"
                :class="{ 'is-invalid': !isValid }"
                :label="control.label"
                :dense=true
                :readonly="control.readonly"
                :name="control.fieldName"
                v-model="control.value">

        <template v-slot:append>
          <div class="input-group-append" v-if="control.isPII">
            <span class="input-group-text clickable" @click="triggerShow">
              <q-icon :name="icon" />
              <!-- <font-awesome-icon icon="faCalendarAlt"></font-awesome-icon> -->
            </span>
          </div>
        </template>
      </q-input>

      <slot name="errors"/>
    </div>

    <slot name="information"/>
    <!-- TODO: ADD SUPPORT!!?? -->
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
import {Hooks} from '../../../../oca.js-vue/gui/components/hook_lists';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fasEye, fasEyeSlash } from '@quasar/extras/fontawesome-v5'

export default {
  name: "TextControl",
  components: { FontAwesomeIcon },
  props: ['control', 'isValid', 'labelPosition'],
  data: function() {
    return {
      showPii: !this.control.isPII,
      icon: fasEyeSlash
    }
  },
  methods: {
    triggerShow() {
      this.showPii = !this.showPii
      if(this.showPii) {
        this.icon = fasEye
      } else {
        this.icon = fasEyeSlash
      }
    }
  },
  mounted() {
    if (this.control.isPII && !this.control.readonly) { this.triggerShow() }

    if (!_.isEmpty(this.control.defaultValue)) {
      this.control.value = this.control.defaultValue;
    }

    // after hook
    //Hooks.Control.afterInit.run(this.control, $(this.$el).find(this.control.isMultiLine ? "textarea" : "input"));
  }
}
</script>

<style scoped>

</style>
