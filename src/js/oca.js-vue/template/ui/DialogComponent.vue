<template>
  <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="showModal" persistent>
        <q-card :class="{ large: size == 'lg', xlarge: size == 'xl' }">
          <q-toolbar>
            <q-toolbar-title>
              <div class="row">
                <span class="text-weight-bold">{{ headerLabel }}</span>
                <slot name="header" />
              </div>
            </q-toolbar-title>

            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>
          <q-card-section>
            <slot name="body" />
          </q-card-section>

          <q-card-actions class="dialog__footer" align="right">
            <q-btn flat label="Close" color="primary" v-close-popup />
            <q-btn flat :label="confirmLabel" color="primary" v-if="!readonly || reviewable" @click="confirmForm" :disabled="processing" v-show="confirmLabel" v-close-popup />
            <q-btn flat :label="rejectLabel" color="primary" v-if="!readonly || reviewable" @click="rejectForm" :disabled="processing" v-show="rejectLabel" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </div>
</template>

<script>
import { QCard, QDialog } from 'quasar'

export default {
  name: "DialogComponent",
  components: {},
  props: ['headerLabel', 'size', 'readonly', 'reviewable',
    'confirmLabel', 'confirmProcessing',
    'rejectLabel', 'rejectProcessing'
  ],
  data: () => ({
    showModal: false
  }),
  computed: {
    processing: function() {
      return this.confirmProcessing || this.rejectProcessing
    }
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    confirmForm() {
      this.$parent.saveForm()
    },
    rejectForm() {
      this.$parent.rejectForm()
    },
    closeModal() {
      this.showModal = false;
    }
  }
}
</script>

<style lang="scss" scoped>

.large {
  width: 600px;
  max-width: 80vw;
}

.xlarge {
  width: 900px;
  max-width: 80vw;
}

.dialog {
  &__footer {
    margin-bottom: 40px;
  }
}

</style>
