<template>
    <!-- <dialog-component ref="DialogModal" size="xl" id="multiPreviewModal" -->
    <!--   :readonly="readonlyDialog" :reviewable="reviewable" :headerLabel="label ? label : 'Service'" -->
    <!--   :confirmLabel="confirmLabel" :confirmProcessing="confirmProcessing" -->
    <!--   :rejectLabel="rejectLabel" :rejectProcessing="rejectProcessing"> -->
    <!--     <template v-slot:body> -->
    <!--       <div class='row'> -->
    <!--         <div class="form-preview" v-for="(formRows, i) in forms" -->
    <!--              :class="[ formRows[0].class ? formRows[0].class : '' ]"> -->
    <!--           <div class='row' v-for="(form, j) in formRows"> -->
    <!--             <div class="form-preview__header row" style="width: 100%"> -->
    <!--               <div class="col-md-7 offset-md-1">{{ form.label }}</div> -->
    <!--               <div class="col-md-4"> -->
    <!--                 <q-select -->
    <!--                   outlined -->
    <!--                   dense -->
    <!--                   options-dense -->
    <!--                   label="Language" -->
    <!--                   v-model="selectedLang[i][j]" -->
    <!--                   :options="form.alternatives.map(a => a.language)"> -->
    <!--                 </q-select> -->
    <!--               </div> -->
    <!--             </div> -->
    <!--             <form-builder-gui :ref="`FormBuilderGui-${i}-${j}`" -->
    <!--               :selected-lang="selectedLang[i][j]" -->
    <!--               :form="form.formData" -->
    <!--               :alternatives="form.alternatives" -->
    <!--               :readonly="form.readonly" -->
    <!--               :key="i"> -->
    <!--             </form-builder-gui> -->
    <!--           </div> -->
    <!--         </div> -->
    <!--       </div> -->
    <!--     </template> -->
    <!-- </dialog-component> -->
</template>

<script>
/*
    import DialogComponent from './DialogComponent';
    import FormBuilderGui from '../../gui/FormBuilderGui';
    import { serializeFormData } from '../../../oca.js-vue/form_data_serializer'
    */

    export default {
        name: "MultiPreviewComponent"
      /*
      ,
        components: { FormBuilderGui, DialogComponent },
        props: ['forms', 'label', 'readonly', 'reviewable',
          'confirmLabel', 'confirmProcessing',
          'rejectLabel', 'rejectProcessing'],
        data: function() {
          return {
            dialogModal: null,
            selectedLang: [[], []],
            readonlyDialog: null,
          }
        },
        watch: {
          forms: {
            handler: function() {
              this.readonlyDialog = this.readonly != false &&
                this.forms.flat().every(form => form.readonly)
            },
            deep: true
          }
        },
        methods: {
            openModal() {
                this.forms.forEach((formsRow, i) => {
                  formsRow.forEach((form, j) => {
                    if (form.input) {
                      this.fillForm(form.formData, form.input)
                    }
                    if(form.alternatives.length) {
                      const enAlt = form.alternatives.find(alt => alt.language.startsWith('en'))
                      if (enAlt) {
                        this.selectedLang[i][j] = enAlt.language
                      } else {
                        this.selectedLang[i][j] = form.alternatives[0].language
                      }
                    }
                    if(form.readonly) {
                        form.formData.sections.forEach(section => {
                            section.row.controls.forEach(control => {
                                control.readonly = true
                            })
                        })
                    }
                  })
                })

                // open
                this.dialogModal.openModal();
            },
            fillForm(formData, input) {
              let payload = null
              if (Array.isArray(Object.values(input)[0] && input[formData.DRI])) {
                if (!input[formData.DRI][0]) {
                  formData.sections.forEach(section => {
                    const control = section.row.controls.find(c => c.type == "reference")
                    if (control) {
                      this.fillForm(control.referenceSchema.form, input)
                    }
                  })
                  return
                }
                payload = input[formData.DRI][0].content
                Object.entries(payload).forEach(([attrName, value]) => {
                  if (typeof value === "string" && value.startsWith('DRI:')) {
                    formData.sections.forEach(section => {
                      const control = section.row.controls.find(c => c.attrName == attrName)
                      if (control) {
                        this.fillForm(control.referenceSchema.form, input)
                      }
                    })
                  }
                })
              } else if (Object.keys(input)[0].startsWith('DRI:')) {
                payload = input[`DRI:${formData.DRI}`].p
                Object.entries(payload).forEach(([attrName, value]) => {
                  if (typeof value === "string" && value.startsWith('DRI:')) {
                    formData.sections.forEach(section => {
                      const control = section.row.controls.find(c => c.attrName == attrName)
                      if (control) {
                        this.fillForm(control.referenceSchema.form, input)
                      }
                    })
                  }
                })
              } else {
                payload = input
              }

              formData.sections.forEach(section => {
                  section.row.controls.forEach(control => {
                      if(payload[control.attrName] == null) {
                          // eventBus.$emit(EventHandlerConstant.ERROR, "Invalid data")
                          throw "Invalid data"
                      }
                      control.value = payload[control.attrName]
                  })
              })
            },
            saveForm() {
                const savedForms = []
                const refKeys = Object.keys(this.$refs).filter(key => (
                  key.includes('FormBuilderGui')
                ))
                refKeys.forEach(key => {
                  const form = this.$refs[key]
                  const isValid = true // form.validateValues()

                  const serializedData = serializeFormData(form)
                  savedForms.push({ isValid, serializedData })
                })
                if(savedForms.some(f => !f.isValid)) { return }
                this.$emitter.emit('oca-form.save_preview', savedForms[0].serializedData)
                this.$emitter.emit('oca-form.save_preview.all', savedForms.map(f => f.serializedData))
            },
            rejectForm() {
                const savedForms = []
                const refKeys = Object.keys(this.$refs).filter(key => (
                  key.includes('FormBuilderGui')
                ))
                refKeys.forEach(key => {
                  const form = this.$refs[key]
                  const isValid = true // form.validateValues()

                  const serializedData = serializeFormData(form)
                  savedForms.push({ isValid, serializedData })
                })
                if(savedForms.some(f => !f.isValid)) { return }
                this.$emitter.emit('oca-form.reject_preview', savedForms[0].serializedData)
                this.$emitter.emit('oca-form.reject_preview.all', savedForms.map(f => f.serializedData))
            },
            closeModal() {
                this.dialogModal.closeModal();
            },
        },
        mounted() {
            this.dialogModal = this.$refs.DialogModal
        }
        */
    }
</script>

<style lang="scss" scoped>
  .form-preview {
    padding: 5px;
    border-left: 1px solid #dee2e6;

    &:first-child {
      border-left: 0px;
    }

    &__header {
      font-size: 20px;
      padding-bottom: 20px;
    }
  }
</style>
