<template>
  <q-page class="q-pa-md">
    <div
      class="row justify-center"
      style="margin-top: 20px;"
    >
      <q-table
        title="Data Sets"
        :rows="rows"
        :columns="columns"
        row-key="name"
        style="min-width: 1000px;"
      >
        <template #header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
            <q-th auto-width />
          </q-tr>
        </template>

        <template #body="props">
          <q-tr :props="props">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
            <q-td auto-width>
              <q-btn
                size="md"
                color="secondary"
                dense
                @click="preview(props.row.dri)"
                label="PREVIEW"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { OCAListEl } from '../entities/OCAListEl'

export default class DataSetsIndex extends Vue {
  columns = [
    {
      name: 'name',
      required: true,
      label: 'Schema',
      align: 'left',
      field: 'name',
      sortable: true
    },
    {
      name: 'entitiesCount',
      required: true,
      label: 'Entities',
      align: 'left',
      field: 'entitiesCount',
      sortable: true
    }
  ]

  rows: OCAListEl[] = []

  async created () {
    this.rows = ((
      await this.$api.get('/oca/list')
    ).data as { results: OCAListEl[] }).results
  }

  preview (dri: string) {
    console.log(dri)
  }
}
</script>
