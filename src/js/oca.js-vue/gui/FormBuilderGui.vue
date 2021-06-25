<template>
    <div class="col-md-12">
        <section-component :form="formCopy"></section-component>
    </div>
</template>

<script>
    import {FormHandler} from "./handler/form_handler";
    import SectionComponent from "./ui/SectionComponent";
    // import { EventHandlerConstant, eventBus } from '../../oca.js-vue/template/handler/event_handler'
    import { flatten } from "array-flatten";

    // dom.watch();
    export default {
        name: "FormBuilderGui",
        components: {
          SectionComponent
        },
        props: {
            form: {
                type: Object
            },
            selectedLang: String,
            alternatives: Array,
            readonly: Boolean
        },
        data() {
          return {
            formCopy: this.form
          }
        },
        watch: {
          selectedLang: {
            handler: function() {
              this.changeOcaForm()
            },
            immediate: true
          }
        },
        methods: {
            getValue() {
                return FormHandler.getValue(this.formCopy);
            },
            setValue(values) {
                if (!_.isObject(values))
                {
                    console.error("Invalid values for Form GUI!");
                    return;
                }

                FormHandler.setValue(this.formCopy, values);
            },
            changeOcaForm() {
                if (!this.selectedLang) { return }
                if (!this.alternatives) { return }
                const inputData = Object.assign({}, ...Object.values(this.getValue()))
                this.formCopy = this.alternatives
                  .find(alt => alt.language == this.selectedLang).form
                this.fillForm(inputData)
                if(this.readonly) {
                    this.formCopy.sections.forEach(section => {
                        section.row.controls.forEach(control => {
                            control.readonly = true
                        })
                    })
                }
            },
            fillForm(input) {
                if(!this.formCopy) { return }
                this.formCopy.sections.forEach(section => {
                    section.row.controls.forEach(control => {
                        if(input[control.attrName] == null) {
                            // eventBus.$emit(EventHandlerConstant.ERROR, "Invalid data")
                            throw "Invalid data"
                        }
                        control.value = input[control.attrName]
                    })
                })
            },
            validateValues() {
                let isSuccess = true
                const controls = flatten(this.formCopy.sections.map(section => {
                    return section.row.controls
                }))
                controls.forEach(control => {
                    control.errors = []
                    if(control.required && control.value.length <= 0) {
                        control.errors.push('must be filled')
                    }

                  if(control.errors.length > 0) { isSuccess = false }
                })
                return isSuccess
            },
        },
        created() {
          //console.log(this.form);
          if(this.readonly) {
              this.formCopy.sections.forEach(section => {
                  section.row.controls.forEach(control => {
                      control.readonly = true
                  })
              })
          }
        }
    }
</script>

<style scoped>

</style>
