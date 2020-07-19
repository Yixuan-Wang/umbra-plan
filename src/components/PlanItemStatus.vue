<template>
  <span class="plan-item-status">
    <v-icon v-if="status === 0" class="plan-item-status-0">
      mdi-checkbox-blank-outline
    </v-icon>
    <v-icon v-else-if="status === 1" class="plan-item-status-1" color="primary">
      mdi-checkbox-marked
    </v-icon>
    <v-icon v-else-if="status === -1" class="plan-item-status-1" color="error">
      mdi-close-box
    </v-icon>
  </span>
</template>

<script>
export default {
  name: 'PlanItemCheckbox',
  props: {
    status: {
      type: Number,
      required: true,
      default: 0,
    },
  },
};
</script>

<style lang="scss">
.plan-item-status {
  cursor: pointer;
  margin-right: 8px;
}
</style>