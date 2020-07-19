<template>
  <div
    v-hotkey="keymap"
  >
    <v-app>
      <!-- <v-app-bar
        class="hidden-sm-and-up"
        app
        color="transparent"
        clipped-right
        flat
      >
        <v-spacer />
        <v-app-bar-nav-icon
          color="primary"
          :ripple="{ center: false }"
          @click="drawer = !drawer"
        >
          <v-icon>mdi-file-document-box</v-icon>
        </v-app-bar-nav-icon>
      </v-app-bar> -->
      <TheBarConsole />
      <TheBarAdd />

      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
        <TheDial />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import TheDial from '@/components/TheDial.vue';
import TheBarConsole from '@/components/TheBarConsole.vue';
import TheBarAdd from '@/components/TheBarAdd.vue';

export default {
  name: 'App',
  components: {
    TheDial,
    TheBarConsole,
    TheBarAdd,
  },
  data: () => ({
    drawer: false,
    items: [
      { title: 'Home', icon: 'dashboard' },
      { title: 'About', icon: 'question_answer' },
    ],
    //
  }),
  computed: {
    keymap() {
      let keymapEntries = Object.entries(this.$store.state.keymap);
      const OPERATION = 0,
            CONTENT = 1;
      let keymap = {};
      for (let entry of keymapEntries) {
        keymap[entry[CONTENT].key] = (event) => {
          event.preventDefault();
          if (entry[CONTENT].type === 'mutation')
            this.$store.commit(entry[OPERATION]);
          else this.$store.dispatch(entry[OPERATION]);
        };
      }
      return keymap;
    },
    ...mapState('database', {
      databaseAvailable: state => state.available,
      databaseStatus: state => state.status,
    }),
  },
  beforeCreate() {
    this.$store.dispatch('database/open');
  },
  methods: {
  },
};
</script>

<style lang="scss">
// @import '~vuetify/src/styles/main.sass';
@import './sass/variables.scss';

::selection {
  background-color: $primary;
  color: white;
}
</style>
