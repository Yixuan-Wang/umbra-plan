<template>
  <div id="bar-action">
    <v-speed-dial
      v-model="displayDial"
      :direction="$vuetify.breakpoint.smAndDown ? 'top' : 'bottom'"
      fixed
      right
      :top="!$vuetify.breakpoint.smAndDown"
      :bottom="$vuetify.breakpoint.smAndDown"
      :transition="$vuetify.breakpoint.smAndDown ? 'slide-y-reverse-transition' : 'slide-y-transition'"
    >
      <template v-slot:activator>
        <v-btn
          v-model="displayDial"
          color="primary"
          dark
          :style="btnStyle.big"
          :text="false"
        >
          <v-icon v-if="displayDial">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-near-me
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        dark
        small
        :style="btnStyle.small"
        color="primary"
        @click.stop="closeDialBeforeCommit('toggleBarConsole')"
      >
        <v-icon>mdi-console-line</v-icon>
      </v-btn>
      <v-btn
        dark
        small
        :style="btnStyle.small"
        color="primary darken-2"
        @click.stop="closeDialBeforeCommit('toggleBarAdd')"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <!-- <v-btn dark small :style="btnStyle.small" color="indigo">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn
        dark
        small
        :style="btnStyle.small"
        color="red"
        @click.stop="$store.dispatch('database/clear')"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn> -->
    </v-speed-dial>
  </div>
</template>

<script>
// import { /*mapState,*/mapMutations } from 'vuex';

export default {
  name: 'TheDial',
  data() {
    return {
      btnStyle: {
        big: { width: '48px', height: '48px', 'min-width': '48px' },
        small: { width: '36px', height: '36px', 'min-width': '36px' },
      },
    };
  },
  computed: {
    displayDial: {
      get() {
        return this.$store.state.displayDial;
      },
      set(value) {
        if (value !== this.$store.state.displayDial)
          this.$store.commit('toggleDial');
      },
    },
    /*...mapState([
    ])*/
  },
  methods: {
    closeDialBeforeCommit(handler, args = []) {
      this.$store.commit('toggleDial');
      this.$store.commit(handler, ...args);
    },
  },
};
</script>

<style lang="scss">
#bar-action {
  .v-speed-dial__list {
    padding-top: 8px !important;
    z-index: 8 !important;
  }

  .v-btn--floating {
    position: relative !important;
  }
}

/* .v-app-bar__nav-icon {
  border-radius: 0% !important;
}
.v-app-bar__nav-icon::before {
  border-radius: 0% !important;
} */
</style>
