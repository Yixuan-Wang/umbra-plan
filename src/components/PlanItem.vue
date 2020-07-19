<template>
  <div class="plan-item">
    <PlanItemStatus
      :status="plan.status"
      @click.native.exact="toggleStatus"
    />
    <BaseInput
      v-model="plan.do"
      class="plan-item-do"
      @input.native="changed = true"
      @blur.native="blurDo"
    />
  </div>
</template>

<script>
import { _ } from '@/lodash';

import BaseInput from './BaseInput';
import PlanItemStatus from './PlanItemStatus';

export default {
  name: 'PlanItem',
  components: {
    BaseInput,
    PlanItemStatus,
  },
  props: {
    plan: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      changed: false,
      previousPlan: _.cloneDeep(this.plan),
    };
  },
  methods: {
    toggleStatus() {
      this.plan.status = (this.plan.status + 1) % 2;
      this.changed = true;
      this.modify();
    },
    blurDo() {
      this.modify();
    },
    modify() {
      if (this.changed) {
        this.$store.dispatch('plan/modify', {
          plan: this.plan,
          previousPlan: this.previousPlan,
        }).then(() => {
          this.previousPlan = _.cloneDeep(this.plan);
        });
        this.changed = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../sass/variables.scss';

.plan-item {
  // grid-template-columns: auto 1fr;
  vertical-align: middle;
  padding-left: 4px;
}

.plan-item .plan-item-do {
  font-size: 1em !important;
}

.plan-item .plan-item-do:focus {
  border-width: 0 0 2px;
  border-style: solid;
  border-color: $primary;
  color: $primary;
}

.plan-item .plan-item-status {
  // padding-left: 4px;
}

/* .plan-item .plan-item-status {
  font-size: 1rem;
  vertical-align: middle;
} */
</style>