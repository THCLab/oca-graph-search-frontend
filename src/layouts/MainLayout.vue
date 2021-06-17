<template>
  <q-layout
    view="hHh lpR fFf"
    class="bg-grey-1"
  >
    <q-header
      elevated
      class="text-white q-py-xs"
      height-hint="58"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-space />

        <q-btn
          flat
          no-caps
          no-wrap
          class="q-ml-xs"
          v-if="$q.screen.gt.xs"
        >
          <q-toolbar-title
            shrink
            class="text-weight-bold"
          >
            Data Sharing Hub Dashboard
          </q-toolbar-title>
        </q-btn>

        <q-space />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-blue-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <div
            v-for="(modulesBlock, i) in modules"
            :key="i"
          >
            <q-item
              v-for="module in modulesBlock"
              :key="module.title"
              :to="module.path"
              v-ripple
              clickable
            >
              <q-item-section avatar>
                <q-icon
                  color="white"
                  :name="module.icon"
                />
              </q-item-section>
              <q-item-section class="text-white">
                <q-item-label>{{ module.title }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator class="q-my-md" />
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class MainLayout extends Vue {
  leftDrawerOpen = false
  modules = [[
    {
      title: 'Criteria search',
      icon: 'search',
      path: '/search'
    },
    {
      title: 'Data Sets',
      icon: 'donut_small',
      path: '/data-sets'
    },
    {
      title: 'My Consents',
      icon: 'content_paste',
      path: '/my-consents'
    },
    {
      title: 'Received Consents',
      icon: 'receipt',
      path: '/received-consents'
    }
  ]]

  toggleLeftDrawer () {
    this.leftDrawerOpen = !this.leftDrawerOpen
  }
}
</script>
