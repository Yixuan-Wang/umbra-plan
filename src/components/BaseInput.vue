<template>
  <span
    ref="input"
    class="input"
    contenteditable
    @input="onInput($event)"
    @focus="focused = true"
    @blur="focused = false"
    @compositionstart="onCompositionStart"
    @compositionend="onCompositionEnd"
    @keydown.enter.prevent=""
  >{{ value }}</span>
</template>

<script>
export default {
  name: 'BaseInput',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      compositing: false,
      caret: 1,
    };
  },
  updated() {
    this.$refs.input.focus();
    window.getSelection().collapse(this.$refs.input.firstChild, this.caret);
  },
  methods: {
    onInput(event) {
      if (this.compositing) return;
      this.caret = window.getSelection().focusOffset;
      this.$emit('change', event.target.innerText);
    },
    onCompositionStart() {
      this.compositing = true;
    },
    onCompositionEnd(event) {
      this.compositing = false;
      this.onInput(event);
    },
  },
};
</script>

<style lang="scss">
.input {
  display: inline;
  outline: none;
  overflow: visible;
  user-select: text;
  white-space: pre-wrap;
  word-break: break-all;
  // &[contenteditable=true]{
  //   // user-modify: read-write-plaintext-only;
  //   &:empty:before {
  //     content: attr(placeholder);
  //     display: inline-block;
  //     color: gray;
  //   }
  // }
}
</style>