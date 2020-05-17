import Vue from 'vue';

const HtmlInput = Vue.extend({
  props: {
    id: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: undefined,
    },
    autofocus: {
      type: Boolean,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: undefined,
    },
    tabindex: {
      type: [String, Number],
      default: undefined,
    },
    variant: {
      type: String,
      default: undefined,
    },
    classes: {
      type: Object,
      default() {
        const componentName = this.$options.name;
        const defaultClasses = componentName ? Vue.vueTailwindTheme[componentName] : undefined;
        return defaultClasses || undefined;
      },
    },
  },
});

export default HtmlInput;