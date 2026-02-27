<template>
  <component
    :is="tag"
    :type="isButton ? type : undefined"
    :href="!isButton ? href : undefined"
    :disabled="isButton ? isDisabled : undefined"
    :aria-disabled="!isButton ? String(isDisabled) : undefined"
    :aria-label="computedAriaLabel"
    :class="[
      baseClasses,
      layoutClasses,
      sizeClass,
      variantClass,
      block ? 'w-full' : '',
      isDisabled ? 'opacity-60 cursor-not-allowed hover:translate-y-0' : '',
      className,
    ]"
    @click="onClick"
  >
    <template v-if="variant === 'icon'">
      <span
        v-if="loading"
        class="mdi mdi-loading inline-flex animate-spin text-[20px]"
        aria-hidden="true"
      />
      <span
        v-else-if="icon"
        :class="['mdi inline-flex text-[20px]', icon]"
        aria-hidden="true"
      />
      <slot v-else />

      <span
        v-if="badge !== null && badge !== undefined"
        class="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] font-semibold text-white shadow-sm"
      >
        {{ formattedBadge }}
      </span>
    </template>

    <template v-else>
      <span
        v-if="loading"
        class="mdi mdi-loading inline-flex animate-spin text-[18px]"
        aria-hidden="true"
      />

      <span
        v-else-if="iconLeft"
        :class="['mdi inline-flex text-[18px]', iconLeft]"
        aria-hidden="true"
      />

      <span v-if="$slots.default" class="inline-flex items-center">
        <slot />
      </span>

      <span
        v-if="iconRight && !loading"
        :class="['mdi inline-flex text-[18px]', iconRight]"
        aria-hidden="true"
      />
    </template>
  </component>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits(["click"]);

const props = defineProps({
  tag: { type: String, default: "button" }, // 'button' | 'a'
  href: { type: String, default: "" },
  type: { type: String, default: "button" },
  variant: {
    type: String,
    default: "primary",
    validator: (v) => ["primary", "glass", "icon"].includes(v),
  },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg"].includes(v),
  },
  iconLeft: { type: String, default: "" },
  iconRight: { type: String, default: "" },
  icon: { type: String, default: "" },
  badge: { type: [String, Number], default: null },
  badgeMax: { type: Number, default: 99 },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  ariaLabel: { type: String, default: "" },
  className: { type: [String, Array, Object], default: "" },
});

const isButton = computed(() => props.tag === "button");
const isDisabled = computed(() => props.disabled || props.loading);

function onClick(e) {
  if (isDisabled.value) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }
  emit("click", e);
}

const formattedBadge = computed(() => {
  if (props.badge === null || props.badge === undefined) return "";
  const n = Number(props.badge);
  if (Number.isFinite(n) && n > props.badgeMax) return `${props.badgeMax}+`;
  return String(props.badge);
});

const computedAriaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel;
  if (props.variant === "icon") return ""; // ideal: obrigar no uso
  return "";
});

const baseClasses =
  "inline-flex items-center justify-center font-medium shadow-sm transition focus:outline-none focus:ring-2";

const layoutClasses = computed(() => {
  return props.variant === "icon" ? "relative" : "gap-2";
});

const sizeClass = computed(() => {
  if (props.variant === "icon") {
    return "h-10 w-10 rounded-xl";
  }

  switch (props.size) {
    case "sm":
      return "h-10 rounded-xl px-4 text-sm";
    case "lg":
      return "h-12 rounded-2xl px-6 text-sm";
    default:
      return "h-12 rounded-2xl px-5 text-sm";
  }
});

const variantClass = computed(() => {
  switch (props.variant) {
    case "primary":
      return [
        "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",
        "shadow-[0_12px_28px_rgba(139,92,246,0.28)]",
        "hover:-translate-y-0.5 hover:from-violet-400 hover:to-fuchsia-400",
        "focus:ring-violet-400/30",
      ].join(" ");

    case "glass":
      return [
        "border",
        // Dark
        "dark:border-white/10 dark:bg-white/5 dark:text-slate-200",
        "dark:hover:border-violet-300/20 dark:hover:bg-violet-500/10 dark:hover:text-violet-200",
        "dark:focus:ring-violet-400/30",
        // Light
        "border-slate-200 bg-white text-slate-700",
        "hover:border-violet-300 hover:bg-violet-50",
        "focus:ring-violet-200",
      ].join(" ");

    case "icon":
      return [
        "border",
        "dark:border-white/10 dark:bg-white/5 dark:text-slate-200",
        "dark:hover:border-violet-400/30 dark:hover:bg-violet-500/10 dark:hover:text-violet-200",
        "dark:focus:ring-violet-400/30",
        "border-slate-200 bg-white text-slate-700",
        "hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700",
        "focus:ring-violet-200",
      ].join(" ");

    default:
      return "";
  }
});
</script>
