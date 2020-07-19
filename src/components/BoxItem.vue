<template>
  <v-card
    class="mx-auto"
  >
    <v-card-title class="box-title">
      <span>{{ name }}</span>
      <v-spacer />
      <v-btn
        v-if="!isNaN(id)"
        color="primary"
        text
        :style="{ width: '36px', height: '36px', 'min-width': '36px' }"
        @click="deleteBox"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <div class="box-content">
      <v-container
        v-if="plans.length !== 0"
      >
        <v-row
          v-for="plan in plans"
          :key="plan.id"
          class="box-row"
          dense
        >
          <v-col col="12">
            <PlanItem
              :key="plan.id"
              :plan="plan"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container
        v-else
      >
        <span class="box-empty">没有计划</span>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { parseBox } from '@/parser/box';
import PlanItem from './PlanItem';

export default {
  name: 'BoxItem',
  components: {
    PlanItem,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    rule: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      plans: [],
      predicate: parseBox(this.rule),
    };
  },
  computed: {
    ...mapState('plan', {
      changed(state) {
        return state.event.changed;
      },
    }),
  },
  watch: {
    changed() {
      if (this.predicate(this.changed?.plan) || this.predicate(this.changed?.previousPlan)) this.pull();
    },
  },
  created() {
    this.pull();
  },
  updated() {
    // eslint-disable-next-line no-console
    console.log(`${this.name} updated at`, new Date());
  },
  methods: {
    pull() {
      this.$store.dispatch('plan/pull', { predicate: this.predicate })
        .then((plans) => this.plans = plans);
    },
    deleteBox() {
      this.$store.dispatch('box/delete', { box: {
        id: this.id,
        name: this.name,
        rule: this.rule,
      } });
    },
  },
};
</script>

<style lang="scss">
.box-title {
  padding-bottom: 4px !important;
}
/* .box-content {
  line-height: 2rem;
  padding: 4px 8px 16px 8px;
} */

/* .box-row {
  height: auto !important;
} */

.box-empty {
  padding: 8px;
}
</style>