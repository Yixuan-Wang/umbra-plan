<template>
  <v-dialog
    v-model="displayBarConsole"
    content-class="bar-console-dialog"
  >
    <v-toolbar dense>
      <v-text-field
        v-model="text"
        autofocus
        hide-details
        :prepend-inner-icon="modes[mode].icon"
        single-line
        @keydown.enter="submitBarConsole"
      />
    </v-toolbar>
  </v-dialog>
</template>

<script>
// import { mapState } from "vuex";
import { parsePlan } from '@/parser/plan';

export default {
  name: 'TheBarConsole',
  data() {
    return {
      text: '',
      mode: 'addPlan',
      modes: {
        addPlan: { icon: 'mdi-plus-circle' },
        addBox: { icon: 'mdi-help-circle' },
        addTag: { icon: 'mdi-plus-circle' },
        command: { icon: 'mdi-chevron-right-circle' },
        debug: { icon: 'mdi-flash-circle' },
      },
    };
  },
  computed: {
    displayBarConsole: {
      get() {
        return this.$store.state.displayBarConsole;
      },
      set(value) {
        if (value !== this.$store.state.displayBarConsole)
          this.$store.commit('toggleBarConsole');
      },
    },
    /* ...mapState([
      'displayBarConsole'
    ]) */
  },
  watch: {
    text(text) {
      switch (text[0]) {
      case '$':
        switch (text[1]) {
        case '!':
          this.mode = 'debug';
          break;
        default:
          this.mode = 'command';
          break;
        }
        break;
      case '+':
        switch (text[1]) {
        case 'b':
          this.mode = 'addBox';
          break;
        case 't':
          this.mode = 'addTag';
          break;
        default:
          this.mode = 'addPlan';
          break;
        }
        break;
      default:
        this.mode = 'addPlan';
        break;
      }
    },
  },
  methods: {
    submitBarConsole() {
      if (this.text.startsWith('$! all')) {
        this.$store.dispatch('database/DB')
          .then((db) => db[this.text.split(' ')[2]].toArray())
          // eslint-disable-next-line no-console
          .then((array) => console.log(array));
        return;
      }
      if (this.text.startsWith('$! erase')) {
        this.$store.dispatch('database/clear');
        return;
      }
      if (this.text.startsWith('+b')) {
        /* this.$store.dispatch('box/add', {
          box: {
            name: boxArray[1],
            rule: boxArray[2],
          },
        }); */
        return;
      }
      this.$store.dispatch('plan/add', {
        plan: parsePlan(this.text),
      });
      this.$store.commit('toggleBarConsole');
      this.text = '';
    },
  },
};
</script>

<style>
.bar-console-dialog {
  margin: 0 !important;
  position: fixed !important;
  top: 5% !important;
  left: 5% !important;
  width: 90% !important;
}
</style>
