<template>
  <v-dialog
    v-model="displayBarAdd"
    content-class="bar-add-dialog"
  >
    <v-card dense>
      <v-card-text class="bar-add-card-text">
        <v-container class="bar-add-container">
          <v-row dense>
            <v-col cols="12">
              <v-btn-toggle
                v-model="scope"
                class="bar-add-toggle"
                mandatory
                color="primary"
                dense
                group
              >
                <v-btn>
                  <v-icon>mdi-checkbox-marked</v-icon>
                </v-btn>
                <v-btn>
                  <v-icon>mdi-inbox</v-icon>
                </v-btn>
                <!-- <v-btn>
                  <v-icon>mdi-tag</v-icon>
                </v-btn> -->
              </v-btn-toggle>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col
              v-if="scope === 0"
              cols="12"
            >
              <v-text-field
                v-model="text"
                autofocus
                hide-details
                single-line
              />
            </v-col>
            <v-col
              v-if="scope === 1"
              cols="6"
            >
              <v-text-field
                v-model="text"
                autofocus
                hide-details
                single-line
              />
            </v-col>
            <v-col
              v-if="scope === 1"
              cols="6"
            >
              <v-text-field
                v-model="rule"
                hide-details
                single-line
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="1" offset="11">
              <v-btn
                class="bar-add-button"
                color="primary"
                @click="submitBarAdd"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// import { mapState } from "vuex";
import { parsePlan } from '@/parser/plan';

const SCOPE = {
  plan: 0,
  box: 1,
  tag: 2,
  category: 3,
};

export default {
  name: 'TheBarAdd',
  data() {
    return {
      text: '',
      scope: 0,
      mode: 'add',
      modes: {
        add: { icon: 'mdi-plus-circle' },
        command: { icon: 'mdi-chevron-right-circle' },
        debug: { icon: 'mdi-flash-circle' },
      },
      rule: '', //! TEMP
    };
  },
  computed: {
    displayBarAdd: {
      get() {
        return this.$store.state.displayBarAdd;
      },
      set(value) {
        if (value !== this.$store.state.displayBarAdd)
          this.$store.commit('toggleBarAdd');
      },
    },
    /* ...mapState([
      'displayBarAdd'
    ]) */
  },
  watch: {
    text(text) {
      if (text.startsWith('$')) {
        this.mode = 'command';
        if (text.startsWith('$!'))
          this.mode = 'debug';
      }
      else this.mode = 'add';
    },
  },
  methods: {
    submitBarAdd() {
      /* if (this.text.startsWith('$!all')) {
        this.$store.dispatch('database/DB')
          .then((db) => db.plans.toArray())
          // eslint-disable-next-line no-console
          .then((array) => console.log(array));
        return;
      }
      if (this.text.startsWith('$!erase')) {
        this.$store.dispatch('database/clear');
        return;
      } */
      if (this.text === '') {
        this.$store.commit('toggleBarAdd');
        this.text = '';
        this.rule = '';
        return;
      }
      switch (this.scope) {
      case SCOPE.plan:
        this.$store.dispatch('plan/add', {
          plan: parsePlan(this.text),
        });
        break;
      case SCOPE.box:
        this.$store.dispatch('box/add', {
          box: {
            name: this.text,
            rule: this.rule,
          },
        });
        break;
      }
      this.$store.commit('toggleBarAdd');
      this.text = '';
      this.rule = '';
    },
  },
};
</script>

<style>
.bar-add-dialog {
  margin: 0 !important;
  position: fixed !important;
  top: 5% !important;
  left: 5% !important;
  width: 90% !important;
}

.bar-add-card-text {
  padding: 20px 24px !important;
}

.bar-add-container {
  max-width: unset !important;
  padding: 0 !important;
}

.bar-add-container .col {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.bar-add-toggle :first-child {
  margin-left: 0 !important;
}

.bar-add-toggle .v-btn {
  border-radius: 4px !important;
  /* margin-left: 0 !important; */
}

.bar-add-button {
  margin: 8px 0 0 0;
}
</style>
