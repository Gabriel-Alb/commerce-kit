<template>
  <div :class="cardClass">
    <p :class="eyebrowClass">
      {{ eyebrow }}
    </p>

    <p :class="titleClass">
      {{ title }}
    </p>

    <p :class="descriptionClass">
      {{ description }}
    </p>

    <div :class="placeholderComputedClass" />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  eyebrow: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "default",
  },
  placeholderClass: {
    type: String,
    default: "",
  },
});

const isHighlight = computed(() => props.variant === "highlight");

const cardClass = computed(() =>
  isHighlight.value
    ? "rounded-3xl border border-violet-300/20 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 p-6 text-white shadow-sm backdrop-blur"
    : "rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur",
);

const eyebrowClass = computed(() =>
  isHighlight.value
    ? "text-xs uppercase tracking-[0.14em] text-white/70"
    : "text-xs uppercase tracking-[0.14em] text-slate-400",
);

const titleClass = computed(() =>
  isHighlight.value
    ? "mt-2 text-2xl font-semibold tracking-tight"
    : "mt-2 text-2xl font-semibold tracking-tight text-white",
);

const descriptionClass = computed(() =>
  isHighlight.value
    ? "mt-3 text-sm leading-6 text-white/80"
    : "mt-3 text-sm leading-6 text-slate-300",
);

const placeholderComputedClass = computed(() => {
  if (props.placeholderClass) {
    return props.placeholderClass;
  }

  return isHighlight.value
    ? "mt-6 h-32 rounded-2xl border border-white/10 bg-white/5"
    : "mt-6 h-32 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900";
});
</script>
