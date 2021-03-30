import Typed, { TypedOptions } from "typed.js";
import { defineComponent, onMounted, onUnmounted, PropType, ref } from "vue";

const emits = [
  "onComplete",
  "preStringTyped",
  "onStringTyped",
  "onLastStringBackspaced",
  "onTypingPaused",
  "onTypingResumed",
  "onReset",
  "onStop",
  "onStart",
  "onDestroy",
];

const createTyped = (config: TypedOptions, el: Element) =>
  new Typed(el, config);

const VueTyped = defineComponent({
  template: `
    <div ref="typedWrapper">
        <slot/>
    </div>
  `,
  emits,
  props: {
    strings: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => ["Hello World!"],
      validator: (arr: string[]) => arr.every((e) => typeof e === "string"),
    },
    stringsElement: {
      type: String,
      required: false,
      default: null,
    },
    typeSpeed: {
      type: Number,
      required: false,
      default: 50,
    },
    startDelay: {
      type: Number,
      required: false,
      default: 0,
    },
    backSpeed: {
      type: Number,
      required: false,
      default: 0,
    },
    smartBackspace: {
      type: Boolean,
      required: false,
      default: true,
    },
    shuffle: {
      type: Boolean,
      required: false,
      default: false,
    },
    backDelay: {
      type: Number,
      required: false,
      default: 700,
    },
    fadeOut: {
      type: Boolean,
      required: false,
      default: false,
    },
    fadeOutClass: {
      type: String,
      required: false,
      default: "typed-fade-out",
    },
    fadeOutDelay: {
      type: Number,
      required: false,
      default: 500,
    },
    loop: {
      type: Boolean,
      required: false,
      default: false,
    },
    loopCount: {
      type: Number,
      required: false,
      default: Infinity,
    },
    showCursor: {
      type: Boolean,
      required: false,
      default: true,
    },
    cursorChar: {
      type: String,
      required: false,
      default: "|",
    },
    autoInsertCss: {
      type: Boolean,
      required: false,
      default: true,
    },
    attr: {
      type: String,
      required: false,
      default: null,
    },
    bindInputFocusEvents: {
      type: Boolean,
      required: false,
      default: false,
    },
    contentType: {
      type: String,
      required: false,
      default: "html",
    },
  },
  setup(props, { emit }) {
    const typedWrapper = ref<HTMLDivElement | null>(null);
    const typed = ref<Typed | null>(null);

    onMounted(() => {
      if (typedWrapper.value) {
        let el: HTMLElement | null = typedWrapper.value.querySelector(".typed");
        if (!el) {
          el = document.createElement("span");
          el.classList.add("typed");
          typedWrapper.value.append(el);
        }

        const _config: Partial<TypedOptions> & { [key: string]: any } = props;
        emits.forEach((e) => (_config[e] = () => emit(e, typed)));

        typed.value = createTyped(_config, el);
      }
    });

    onUnmounted(() => typed.value && typed.value.destroy());

    return {
      typedWrapper,
      typed,
    };
  },
});

export { VueTyped };

export default VueTyped;
