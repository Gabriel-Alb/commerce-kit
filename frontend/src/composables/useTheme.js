import { ref, computed, watchEffect } from "vue";

export function useTheme(options = {}) {
  const key = options.key ?? "app-theme";
  const defaultTheme = options.defaultTheme === "light" ? "light" : "dark";
  const applyToHtml = options.applyToHtml ?? true;

  const theme = ref(defaultTheme);

  try {
    const saved = localStorage.getItem(key);
    if (saved === "dark" || saved === "light") theme.value = saved;
  } catch {}

  const isDark = computed(() => theme.value === "dark");

  function setTheme(value) {
    theme.value = value === "light" ? "light" : "dark";
  }

  function toggleTheme() {
    theme.value = theme.value === "dark" ? "light" : "dark";
  }

  watchEffect(() => {
    const value = theme.value;

    try {
      localStorage.setItem(key, value);
    } catch {}

    if (applyToHtml && typeof document !== "undefined") {
      const root = document.documentElement;
      if (value === "dark") root.classList.add("dark");
      else root.classList.remove("dark");

      root.style.colorScheme = value;
    }
  });

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
}
