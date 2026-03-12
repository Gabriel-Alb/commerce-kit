<template>
  <component
    :is="tag"
    :type="isButton ? type : undefined"
    :href="tag === 'a' ? href : undefined"
    :disabled="isButton ? disabled || loading : undefined"
    :aria-label="computedAriaLabel"
    :aria-busy="loading ? 'true' : undefined"
    :class="rootClass"
    v-bind="$attrs"
  >
    <span v-if="loading" class="inline-flex items-center">
      <span class="ck-spinner" aria-hidden="true" />
    </span>

    <span
      v-else-if="hasLeftIcon"
      class="inline-flex items-center"
      aria-hidden="true"
    >
      <slot name="left">
        <span :class="['mdi', iconLeft, iconClass]" />
      </slot>
    </span>

    <span v-if="hasLabel" :class="labelClass">
      <slot />
    </span>

    <span
      v-if="hasRightIcon"
      class="inline-flex items-center"
      aria-hidden="true"
    >
      <slot name="right">
        <span :class="['mdi', iconRight, iconClass]" />
      </slot>
    </span>
  </component>
</template>

<script setup>
import { computed, useSlots } from "vue";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  as: { type: String, default: "button" },
  href: { type: String, default: "" },
  type: { type: String, default: "button" },

  tone: {
    type: String,
    default: "",
    validator: (v) => ["", "dark", "light"].includes(v),
  },

  variant: {
    type: String,
    default: "secondary",
    validator: (v) =>
      [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "soft",
        "icon",
        "danger",
        "link",
        "header-toggle",
        "header-icon",
        "header-primary",
      ].includes(v),
  },

  size: {
    type: String,
    default: "md",
    validator: (v) => ["xs", "sm", "md", "lg"].includes(v),
  },

  iconLeft: { type: String, default: "" },
  iconRight: { type: String, default: "" },
  iconOnly: { type: Boolean, default: false },

  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  rounded: { type: String, default: "xl" },
  ariaLabel: { type: String, default: "" },
});

const slots = useSlots();
const tag = computed(() => props.as);
const isButton = computed(() => tag.value === "button");

const hasSlotLabel = computed(() => !!slots.default);
const hasLabel = computed(() => !props.iconOnly && hasSlotLabel.value);

const hasLeftIcon = computed(() => !!props.iconLeft || !!slots.left);
const hasRightIcon = computed(() => !!props.iconRight || !!slots.right);

const computedAriaLabel = computed(() => {
  if (props.iconOnly) return props.ariaLabel || "Action";
  return props.ariaLabel || undefined;
});

const roundedClass = computed(() => {
  const map = {
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };
  return map[props.rounded] || "rounded-xl";
});

const sizeClass = computed(() => {
  const map = {
    xs: props.iconOnly ? "h-8 w-8 text-xs" : "h-8 px-3 text-xs",
    sm: props.iconOnly ? "h-9 w-9 text-sm" : "h-9 px-3.5 text-sm",
    md: props.iconOnly ? "h-10 w-10 text-sm" : "h-10 px-4 text-sm",
    lg: props.iconOnly ? "h-12 w-12 text-base" : "h-12 px-5 text-base",
  };
  return map[props.size];
});

const baseClass = computed(() => {
  return [
    "inline-flex select-none items-center justify-center gap-2",
    "transition focus:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-60",
    props.block ? "w-full" : "",
    roundedClass.value,
    sizeClass.value,
  ]
    .filter(Boolean)
    .join(" ");
});

const resolvedToneIsDark = computed(() => {
  if (props.tone === "dark") return true;
  if (props.tone === "light") return false;
  return true;
});

const variantClass = computed(() => {
  const v = props.variant;

  if (v === "header-toggle") {
    return [
      "border shadow-sm",
      resolvedToneIsDark.value
        ? "border-white/10 bg-white/5 text-slate-200 hover:border-violet-400/30 hover:bg-violet-500/10 focus:ring-2 focus:ring-violet-400/30"
        : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50 focus:ring-2 focus:ring-violet-200",
    ].join(" ");
  }

  if (v === "header-icon") {
    return [
      "border shadow-sm",
      resolvedToneIsDark.value
        ? [
            "border-white/10 bg-white/5 text-slate-200",
            "hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-200",
            "focus:ring-2 focus:ring-violet-400/30",
          ].join(" ")
        : [
            "border-slate-200 bg-white text-slate-700",
            "hover:border-violet-300 hover:bg-violet-50 hover:text-slate-800",
            "focus:ring-2 focus:ring-violet-200",
          ].join(" "),
    ].join(" ");
  }

  if (v === "header-primary") {
    return [
      "border-transparent text-white",
      "bg-gradient-to-r from-violet-500 to-fuchsia-500",
      "shadow-[0_8px_20px_rgba(139,92,246,0.25)]",
      "hover:from-violet-400 hover:to-fuchsia-400",
      "focus:ring-2 focus:ring-violet-400/30",
    ].join(" ");
  }

  if (v === "primary") {
    return [
      "border-transparent text-white",
      "bg-gradient-to-r from-violet-500 to-fuchsia-500",
      "shadow-[0_12px_28px_rgba(139,92,246,0.28)]",
      "hover:-translate-y-0.5 hover:from-violet-400 hover:to-fuchsia-400",
      "focus:ring-2 focus:ring-violet-400/30",
    ].join(" ");
  }

  if (v === "secondary") {
    return [
      "border shadow-sm",
      "border-white/10 bg-white/5 text-slate-200",
      "hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200",
      "focus:ring-2 focus:ring-violet-400/30",
    ].join(" ");
  }

  if (v === "soft") {
    return [
      "border shadow-sm backdrop-blur",
      "border-white/10 bg-white/5 text-slate-200",
      "hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200",
      "focus:ring-2 focus:ring-violet-400/30",
    ].join(" ");
  }

  if (v === "icon") {
    return [
      "border shadow-sm",
      "border-white/10 bg-white/5 text-slate-200",
      "hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-200",
      "focus:ring-2 focus:ring-violet-400/30",
    ].join(" ");
  }

  if (v === "outline") {
    return [
      "border shadow-sm bg-transparent",
      "border-white/10 text-slate-200",
      "hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200",
      "focus:ring-2 focus:ring-violet-400/30",
    ].join(" ");
  }

  if (v === "ghost") {
    return [
      "border-transparent bg-transparent shadow-none",
      "text-slate-200",
      "hover:bg-violet-500/10 hover:text-violet-200",
      "focus:ring-2 focus:ring-violet-400/30",
    ].join(" ");
  }

  if (v === "danger") {
    return [
      "border-transparent text-white",
      "bg-gradient-to-r from-rose-500 to-red-500",
      "shadow-[0_10px_24px_rgba(239,68,68,0.22)]",
      "hover:from-rose-400 hover:to-red-400",
      "focus:ring-2 focus:ring-red-400/30",
    ].join(" ");
  }

  return [
    "border-transparent bg-transparent shadow-none",
    "px-0",
    "text-violet-300 hover:underline",
  ].join(" ");
});

const rootClass = computed(() => {
  return [baseClass.value, variantClass.value, props.iconOnly ? "gap-0" : ""]
    .filter(Boolean)
    .join(" ");
});

const iconClass = computed(() => {
  const map = {
    xs: "text-[16px]",
    sm: "text-[18px]",
    md: "text-[20px]",
    lg: "text-[22px]",
  };
  return map[props.size] || "text-[20px]";
});

const labelClass = computed(() => "font-medium");
</script>

<style scoped>
.ck-spinner {
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: rgba(255, 255, 255, 0.95);
  animation: ckspin 0.8s linear infinite;
}
.theme-light .ck-spinner {
  border-color: rgba(15, 23, 42, 0.18);
  border-top-color: rgba(15, 23, 42, 0.75);
}
@keyframes ckspin {
  to {
    transform: rotate(360deg);
  }
}
</style>
