<template>
  <div>
    <q-select outlined v-model="selected" :options="options" :label="label" :dense=true :disable="disabled" />
      <!-- <select class="form-control select2-hidden-accessible" :class="{ 'is-invalid': !isValid }" :placeholder="placeholder" :disabled="disabled" style="width: 100%"></select> -->
      <slot name="errors"/>
  </div>
</template>

<script>

export default {
  name: 'Select2Control',
  data() {
    return {
      selected: null
    };
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    settings: {
      type: Object,
      default: () => {}
    },
    isValid: {
      type: Boolean,
      default: true
    },
    modelValue: null
  },
  watch: {
    selected(val) {
      if (val) {
        this.$emit('update:modelValue', `${val.value}`);
      }
    },
    options(val) {
      this.setOption(val);
    },
    value(val) {
      this.setValue(val);
    }
  },
  methods: {
    setOption(val = []) {
      throw "to be impl!";
      this.select2.empty();
      this.select2.select2({
        ...this.settings,
        data: val
      });
      this.setValue(this.modelValue);
    },
    setValue(val) {
      // this.modelValue = `${val}`;
    }
  },
  mounted() {
    this.selected = this.options.find(o => o.value == this.modelValue)
    /*
    this.select2 = $(this.$el)
      .find('select')
      .select2({
        ...this.settings,
        theme: 'bootstrap4',
        data: this.options
      })
      .on('select2:select select2:unselect', ev => {
        const { id, text, selected } = ev['params']['data'];
        const selectValue = this.select2.val();
        this.$emit('change', selectValue);
        this.$emit('select', { id, text, selected });
      });
    this.setValue(this.value);
    */
  },
};
</script>
