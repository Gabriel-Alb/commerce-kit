<template>
  <header
    class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
  >
    <div
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <a
        :href="brand.href"
        class="flex items-center gap-3"
        :aria-label="brand.ariaLabel || `${brand.title} - Ir para o topo`"
      >
        <div
          class="grid h-9 w-9 place-items-center rounded-xl border border-violet-400/30 bg-white/5 shadow-[0_8px_24px_rgba(139,92,246,0.15)]"
        >
          <span class="text-sm font-bold tracking-tight text-violet-300">
            {{ brand.short }}
          </span>
        </div>

        <div class="leading-tight">
          <p class="text-sm font-semibold tracking-tight text-white">
            {{ brand.title }}
          </p>
          <p class="text-[11px] text-slate-400">
            {{ brand.subtitle }}
          </p>
        </div>
      </a>

      <nav
        class="hidden items-center gap-7 md:flex"
        aria-label="Navegação principal"
      >
        <a
          v-for="item in navItems"
          :key="item.id || item.href"
          :href="item.href"
          class="text-sm text-slate-300 transition hover:text-violet-300"
          @click="emit('nav-click', item)"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <template v-for="action in orderedDesktopActions" :key="action.id">
          <CkButton
            v-if="action.type === 'theme-toggle'"
            variant="glass"
            size="sm"
            :icon-left="isDark ? action.iconDark : action.iconLight"
            :aria-label="isDark ? action.ariaLabelLight : action.ariaLabelDark"
            class-name="h-10 rounded-xl px-3"
            @click="emit('toggle-theme')"
          >
            <span class="hidden sm:inline">
              {{
                isDark
                  ? (action.labelLight ?? "Light")
                  : (action.labelDark ?? "Dark")
              }}
            </span>
          </CkButton>

          <CkButton
            v-else-if="action.type === 'icon'"
            variant="icon"
            :icon="action.icon"
            :badge="action.badge"
            :aria-label="action.ariaLabel"
            :class-name="action.className"
            @click="emit('action', action)"
          />

          <CkButton
            v-else-if="action.type === 'button'"
            :variant="action.variant || 'primary'"
            :size="action.size || 'sm'"
            :icon-left="action.iconLeft"
            :icon-right="action.iconRight"
            :aria-label="action.ariaLabel || action.label"
            :class-name="action.className"
            @click="emit('action', action)"
          >
            {{ action.label }}
          </CkButton>
        </template>

        <CkButton
          variant="icon"
          :icon="isMobileMenuOpen ? 'mdi-close' : 'mdi-menu'"
          class-name="md:hidden"
          :aria-expanded="isMobileMenuOpen ? 'true' : 'false'"
          :aria-controls="mobileMenuId"
          aria-label="Abrir menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        />
      </div>
    </div>

    <div
      v-show="isMobileMenuOpen"
      :id="mobileMenuId"
      class="border-t border-white/10 bg-slate-950/95 md:hidden"
    >
      <nav
        class="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6"
        aria-label="Navegação mobile"
      >
        <a
          v-for="item in navItems"
          :key="`mobile-${item.id || item.href}`"
          :href="item.href"
          class="rounded-lg px-2 py-2 text-sm text-slate-200 transition hover:bg-violet-500/10 hover:text-violet-200"
          @click="onMobileNavClick(item)"
        >
          {{ item.label }}
        </a>

        <div v-if="mobileMenuActions.length" class="mt-2 space-y-2">
          <template v-for="action in mobileMenuActions" :key="`m-${action.id}`">
            <CkButton
              v-if="action.type === 'button'"
              :variant="action.variant || 'primary'"
              :size="action.size || 'sm'"
              :icon-left="action.iconLeft"
              :icon-right="action.iconRight"
              :aria-label="action.ariaLabel || action.label"
              class-name="h-10 w-full rounded-xl"
              @click="onMobileActionClick(action)"
            >
              {{ action.label }}
            </CkButton>

            <CkButton
              v-else-if="action.type === 'icon'"
              variant="glass"
              size="sm"
              :icon-left="action.icon"
              :aria-label="action.ariaLabel"
              class-name="h-10 w-full rounded-xl justify-center"
              @click="onMobileActionClick(action)"
            >
              {{ action.label || action.ariaLabel }}
            </CkButton>
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from "vue";
import CkButton from "@/components/ui/CkButton.vue";

const emit = defineEmits(["toggle-theme", "nav-click", "action"]);

const props = defineProps({
  isDark: { type: Boolean, default: true },
  brand: {
    type: Object,
    default: () => ({
      href: "#",
      ariaLabel: "Ir para o topo",
      short: "CK",
      title: "CommerceKit",
      subtitle: "premium store experience",
    }),
  },
  navItems: {
    type: Array,
    default: () => [],
  },


  actions: {
    type: Array,
    default: () => [],
  },

  mobileMenuId: { type: String, default: "mobile-menu" },
});

const isMobileMenuOpen = ref(false);

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

function onMobileNavClick(item) {
  isMobileMenuOpen.value = false;
  emit("nav-click", item);
}

function onMobileActionClick(action) {
  isMobileMenuOpen.value = false;

  if (action.type === "theme-toggle") {
    emit("toggle-theme");
    return;
  }

  emit("action", action);
}
</script>
