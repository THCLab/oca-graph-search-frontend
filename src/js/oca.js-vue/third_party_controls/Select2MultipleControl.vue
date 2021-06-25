<template>
    <div>
      <q-select outlined v-model="selected" :options="options" :label="label" :dense="true" :disable="disabled" multiple />
        <!-- <select class="form-control select2-hidden-accessible" :class="{ 'is-invalid': !isValid }" :placeholder="placeholder" :disabled="disabled" multiple="multiple" style="width: 100%"></select> -->
        <slot name="errors"/>
    </div>
</template>

<script>
    //import $ from 'jquery';
    //import 'select2';
    //import 'select2/dist/css/select2.min.css'
    //import '@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.min.css'

    export default {
        name: 'Select2MultipleControl',
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
              this.$emit('update:modelValue', val.map(v => `${v.value}`).sort());
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
              /*
                if (val instanceof Array) {
                    this.value([...val]);
                } else {
                    this.value([val]);
                }
                */
            }
        },
        mounted() {
          if (this.modelValue) {
            this.selected = this.options.filter(o => this.modelValue.includes(`${o.value}`))
          }
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
        beforeDestroy() {
            // this.select2.select2('destroy');
        }
    };
</script>
