<template>
  <dialog-component ref='DialogModal' size='lg'
                    id="previewModal" :headerLabel="label"
                    :readonly="readonly" :reviewable="reviewable"
                    :confirmLabel="confirmLabel ? confirmLabel : 'Save'"
                    :rejectLabel="rejectLabel"
                    :confirmProcessing="confirmProcessing"
                    :rejectProcessing="rejectProcessing">
    <template v-slot:header>
      <div class="col-md-3">
        <q-select
          outlined
          dense
          options-dense
          label="Language"
          style="margin-left: 10px;"
          class="form-control"
          v-model="selectedLang"
          :options="alternativesFromData.map(alt => alt.language)">
        </q-select>
      </div>
    </template>

    <template v-slot:body>
      <form-builder-gui ref="FormBuilderGui"
                        :selected-lang="selectedLang"
                        :form="formData"
                        :alternatives="alternativesFromData"
                        :readonly="readonly"
                        :key="formData._uniqueId"></form-builder-gui>
    </template>
  </dialog-component>
</template>

<script>
import DialogComponent from './DialogComponent';
import FormBuilderGui from '../../gui/FormBuilderGui';
import { serializeFormData } from '../../../oca.js-vue/form_data_serializer'

export default {
  name: "PreviewComponent",
  components: {
    FormBuilderGui,
    DialogComponent
  },
  props: ['form', 'alternatives', 'readonly', 'reviewable',
    'confirmLabel', 'confirmProcessing',
    'rejectLabel', 'rejectProcessing'],
  data: () => ({
    alternativesFromData: [],
    dialogModal: null,
    selectedLang: null,
    formData: {},
    formInput: null,
    formReadonly: null,
    savedData: null,
    label: ''
  }),
  methods: {
    openModal(formData, formInput = null, formAlternatives = null) {
      this.alternativesFromData = [{
        language: formData.translations[0].language,
        form: formData
      }]
      let alts = formAlternatives || this.alternativesFromData
      if(alts && alts.length) {
        const enAlt = alts.find(alt => alt.language.startsWith('en'))
        if (enAlt) {
          this.selectedLang = enAlt.language
        } else {
          this.selectedLang = alts[0].language
        }
      }
      this.formInput = formInput
      // set data
      this.formData = _.cloneDeep(formData);
      this.formData._uniqueId = Math.random();
      this.label = this.formData.label
      if(formInput) {
        this.fillForm(this.formData, formInput)
        if(this.formReadonly == null) {
          this.formReadonly = true
        }
      }
      if(this.formReadonly) {
        this.formData.sections.forEach( section => {
          section.row.controls.forEach(control => {
            control.readonly = true
          })
        })
      }

      // open
      this.dialogModal.openModal()
    },
    fillForm(formData, input) {
      let payload

      if (Array.isArray(Object.values(input)[0]) && input[formData.DRI]) {
        if (!input[formData.DRI][0]) { return }
        const content = JSON.parse(input[formData.DRI][0].content)
        payload = content[`DRI:${formData.DRI}`].p
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
                  //eventBus.$emit(EventHandlerConstant.ERROR, "Invalid data")
                  throw "Invalid data"
              }
              control.value = payload[control.attrName]
          })
      })
    },
    saveForm() {
      const formRef = this.$refs.FormBuilderGui
      // TODO: no validation at the moment as this seems to be broken according to Michal
      // const isValid = formRef.validateValues()
      const isValid = true;
      if(!isValid) { return }

      const serializedData = serializeFormData(formRef)
      this.$emitter.emit('oca-form.save_preview', serializedData)
    },
    rejectForm() {
      this.$emitter.emit('oca-form.reject_preview', {})
    },
    closeModal() {
      this.dialogModal.closeModal();
    }
  },
  mounted() {
    this.dialogModal = this.$refs.DialogModal
    this.formReadonly = this.readonly
  }
}
</script>

<style lang="scss" scoped>
</style>
