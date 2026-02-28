<template>
  <div
    :class="[
      'min-h-screen transition-colors duration-300',
      isDark
        ? 'theme-dark bg-slate-950 text-slate-100 selection:bg-violet-300/30 selection:text-white'
        : 'theme-light bg-slate-50 text-slate-900 selection:bg-violet-200/60 selection:text-violet-950',
      rootClass,
    ]"
  >
    <slot :theme="theme" :isDark="isDark" :toggleTheme="toggleTheme" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTheme } from "../../composables/useTheme";

const props = defineProps({
  persistKey: { type: String, default: "commercekit-theme" },
  defaultTheme: { type: String, default: "dark" }, // 'dark' | 'light'
  rootClass: { type: [String, Array, Object], default: "" },
  applyToHtml: { type: Boolean, default: true },
});

const { theme, isDark, toggleTheme } = useTheme({
  key: props.persistKey,
  defaultTheme: props.defaultTheme,
  applyToHtml: props.applyToHtml,
});

const safeTheme = computed(() => (theme.value === "light" ? "light" : "dark"));
</script>
