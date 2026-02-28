<template>
  <header :class="ui.header">
    <div :class="ui.container">
      <slot name="brand" :brand="brand" :ui="ui">
        <a
          :href="brand.href"
          class="flex items-center gap-3"
          :aria-label="brand.ariaLabel || `${brand.title} - Back to top`"
        >
          <div :class="ui.brandBadge">
            <span :class="ui.brandShort">
              {{ brand.short }}
            </span>
          </div>

          <div class="leading-tight">
            <p :class="ui.brandTitle">
              {{ brand.title }}
            </p>
            <p :class="ui.brandSubtitle">
              {{ brand.subtitle }}
            </p>
          </div>
        </a>
      </slot>

      <slot
        name="nav"
        :items="navItems"
        :ui="ui"
        :onNavClick="onDesktopNavClick"
      >
        <nav
          class="hidden items-center gap-7 md:flex"
          aria-label="Primary navigation"
        >
          <a
            v-for="item in navItems"
            :key="item.id || item.href"
            :href="item.href"
            :class="ui.navLink"
            @click="onDesktopNavClick(item)"
          >
            {{ item.label }}
          </a>
        </nav>
      </slot>

      <div class="flex items-center gap-2">
        <slot name="actions" :actions="orderedDesktopActions" :ui="ui">
          <template v-for="action in orderedDesktopActions" :key="action.id">
            <CkButton
              v-if="action.type === 'theme-toggle'"
              variant="header-toggle"
              :tone="isDark ? 'dark' : 'light'"
              size="md"
              :icon-left="isDark ? action.iconDark : action.iconLight"
              :aria-label="
                isDark
                  ? (action.ariaLabelLight ?? 'Switch to light theme')
                  : (action.ariaLabelDark ?? 'Switch to dark theme')
              "
              class="h-10 rounded-xl px-3 md:px-3 max-md:w-10 max-md:px-0"
              :iconOnly="false"
              @click="emit('toggle-theme')"
            >
              <span class="hidden md:inline">
                {{
                  isDark
                    ? (action.labelLight ?? "Light")
                    : (action.labelDark ?? "Dark")
                }}
              </span>
            </CkButton>

            <CkButton
              v-else-if="action.type === 'icon'"
              variant="header-icon"
              :tone="isDark ? 'dark' : 'light'"
              size="md"
              iconOnly
              :aria-label="action.ariaLabel"
              class="relative h-10 w-10 rounded-xl"
              @click="emit('action', action)"
            >
              <template #left>
                <span :class="['mdi', action.icon, 'text-[20px]']" />
              </template>

              <span
                v-if="action.badge"
                class="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] font-semibold text-white shadow-sm"
              >
                {{ action.badge }}
              </span>
            </CkButton>

            <CkButton
              v-else-if="action.type === 'button'"
              :variant="action.variant || 'primary'"
              :size="action.size || 'md'"
              :icon-left="action.iconLeft"
              :icon-right="action.iconRight"
              :aria-label="action.ariaLabel || action.label"
              class="h-10 rounded-xl hidden md:inline-flex"
              :class="action.className"
              @click="emit('action', action)"
            >
              {{ action.label }}
            </CkButton>
          </template>
        </slot>

        <CkButton
          variant="header-icon"
          :tone="isDark ? 'dark' : 'light'"
          size="md"
          iconOnly
          :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMobileMenuOpen ? 'true' : 'false'"
          :aria-controls="mobileMenuId"
          class="md:hidden h-10 w-10 rounded-xl"
          @click="toggleMobileMenu"
        >
          <template #left>
            <span
              :class="[
                'mdi',
                isMobileMenuOpen ? 'mdi-close' : 'mdi-menu',
                'text-[20px]',
              ]"
            />
          </template>
        </CkButton>
      </div>
    </div>

    <div
      v-show="isMobileMenuOpen"
      :id="mobileMenuId"
      :class="ui.mobileMenu"
      @keydown.esc.stop.prevent="closeMobileMenu"
    >
      <nav
        class="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6"
        aria-label="Mobile navigation"
      >
        <a
          v-for="item in navItems"
          :key="`mobile-${item.id || item.href}`"
          :href="item.href"
          :class="ui.mobileNavLink"
          @click="onMobileNavClick(item)"
        >
          {{ item.label }}
        </a>

        <div v-if="mobileMenuActions.length" class="mt-2 space-y-2">
          <template v-for="action in mobileMenuActions" :key="`m-${action.id}`">
            <CkButton
              v-if="action.type === 'button'"
              :variant="action.variant || 'primary'"
              :size="action.size || 'md'"
              :icon-left="action.iconLeft"
              :icon-right="action.iconRight"
              :aria-label="action.ariaLabel || action.label"
              class="h-10 w-full rounded-xl justify-center"
              @click="onMobileActionClick(action)"
            >
              {{ action.label }}
            </CkButton>

            <CkButton
              v-else-if="action.type === 'icon'"
              :variant="action.label ? 'soft' : 'icon'"
              size="md"
              :icon-left="action.label ? action.icon : ''"
              :iconOnly="false"
              :aria-label="action.ariaLabel"
              class="h-10 w-full rounded-xl justify-center"
              @click="onMobileActionClick(action)"
            >
              <template v-if="action.label" #left>
                <span :class="['mdi', action.icon, 'text-[20px]']" />
              </template>

              {{ action.label || action.ariaLabel }}
            </CkButton>

            <CkButton
              v-else-if="action.type === 'theme-toggle'"
              variant="soft"
              size="md"
              :icon-left="isDark ? action.iconDark : action.iconLight"
              :aria-label="
                isDark
                  ? (action.ariaLabelLight ?? 'Switch to light theme')
                  : (action.ariaLabelDark ?? 'Switch to dark theme')
              "
              class="h-10 w-full rounded-xl justify-center"
              @click="onMobileActionClick(action)"
            >
              {{
                isDark
                  ? (action.labelLight ?? "Light")
                  : (action.labelDark ?? "Dark")
              }}
            </CkButton>
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import CkButton from "../ui/CkButton.vue";

const emit = defineEmits(["toggle-theme", "nav-click", "action"]);

const props = defineProps({
  isDark: { type: Boolean, default: true },
  theme: { type: String, default: "" }, // 'dark' | 'light' | ''
  headerClass: { type: String, default: "" },

  brand: {
    type: Object,
    default: () => ({
      href: "#",
      ariaLabel: "Back to top",
      short: "CK",
      title: "CommerceKit",
      subtitle: "premium store experience",
    }),
  },

  navItems: { type: Array, default: () => [] },
  actions: { type: Array, default: () => [] },
  mobileMenuId: { type: String, default: "mobile-menu" },
});

const isMobileMenuOpen = ref(false);

const resolvedTheme = computed(() => {
  if (props.theme === "dark" || props.theme === "light") return props.theme;
  return props.isDark ? "dark" : "light";
});

const ui = computed(() => {
  const isDarkTheme = resolvedTheme.value === "dark";

  const headerBase =
    "sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300";
  const headerTheme = isDarkTheme
    ? "border-b border-white/10 bg-slate-950/80"
    : "border-b border-slate-900/10 bg-white/80";

  return {
    header: [headerBase, headerTheme, props.headerClass]
      .filter(Boolean)
      .join(" "),
    container:
      "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",

    brandBadge: isDarkTheme
      ? "grid h-9 w-9 place-items-center rounded-xl border border-violet-400/30 bg-white/5 shadow-[0_8px_24px_rgba(139,92,246,0.15)]"
      : "grid h-9 w-9 place-items-center rounded-xl border border-violet-500/20 bg-violet-500/10 shadow-[0_8px_24px_rgba(139,92,246,0.12)]",

    brandShort: isDarkTheme
      ? "text-sm font-bold tracking-tight text-violet-300"
      : "text-sm font-bold tracking-tight text-violet-700",

    brandTitle: isDarkTheme
      ? "text-sm font-semibold tracking-tight text-white"
      : "text-sm font-semibold tracking-tight text-slate-900",

    brandSubtitle: isDarkTheme
      ? "text-[11px] text-slate-400"
      : "text-[11px] text-slate-600",

    navLink: isDarkTheme
      ? "text-sm text-slate-300 transition hover:text-violet-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 rounded-md"
      : "text-sm text-slate-700 transition hover:text-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 rounded-md",

    mobileMenu: isDarkTheme
      ? "border-t border-white/10 bg-slate-950/95 md:hidden"
      : "border-t border-slate-900/10 bg-white/95 md:hidden",

    mobileNavLink: isDarkTheme
      ? "rounded-lg px-2 py-2 text-sm text-slate-200 transition hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
      : "rounded-lg px-2 py-2 text-sm text-slate-800 transition hover:bg-violet-600/10 hover:text-violet-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40",
  };
});

const orderedDesktopActions = computed(() => {
  return (props.actions || [])
    .map((a, idx) => ({ ...a, id: a.id ?? `${a.type}-${idx}` }))
    .filter((a) => (a.showOn ?? "both") !== "mobile");
});

const mobileMenuActions = computed(() => {
  return (props.actions || [])
    .map((a, idx) => ({ ...a, id: a.id ?? `${a.type}-${idx}` }))
    .filter((a) => a.showInMobileMenu === true);
});

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function onDesktopNavClick(item) {
  emit("nav-click", item);
}

function onMobileNavClick(item) {
  closeMobileMenu();
  emit("nav-click", item);
}

function onMobileActionClick(action) {
  closeMobileMenu();

  if (action.type === "theme-toggle") {
    emit("toggle-theme");
    return;
  }

  emit("action", action);
}

watch(resolvedTheme, () => closeMobileMenu());
</script>
