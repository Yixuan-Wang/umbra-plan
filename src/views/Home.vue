<template>
  <div class="home">
    <v-container>
      <v-row dense>
        <v-col
          v-for="(box, index) in boxes"
          :key="index"
          cols="12"
        >
          <BoxItem
            :id="box.id"
            :name="box.name"
            :rule="box.rule"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import BoxItem from '@/components/BoxItem.vue';

export default {
  name: 'Home',
  components: {
    BoxItem,
  },
  data() {
    return {
      boxes: [],
    };
  },
  computed: {
    ...mapState('box', {
      changed(state) {
        return state.event.changed;
      },
    }),
  },
  watch: {
    changed() {
      this.pull();
    },
  },
  created() {
    this.pull();
  },
  methods: {
    pull() {
      let defaultBoxes = [
        {
          name: '全部',
          rule: '',
          id: NaN,
        },
        /* {
          name: '测试',
          rule: '测试|test',
          id: NaN,
        },
        {
          name: '含有数字的',
          rule: '\\d',
          id: NaN,
        }, */
      ];
      this.$store.dispatch('box/pull', { predicate: () => true })
        .then((boxes) => this.boxes = [...defaultBoxes, ...boxes]);
    },
  },
};
</script>
