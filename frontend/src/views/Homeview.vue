<template>
  <AppShell v-slot="{ isDark, toggleTheme }">
    <AppHeader
      :is-dark="isDark"
      :brand="{
        href: '#',
        short: 'CK',
        title: 'CommerceKit',
        subtitle: 'premium store experience',
        ariaLabel: 'CommerceKit - Ir para o topo',
      }"
      :nav-items="navItems"
      :actions="headerActions"
      @toggle-theme="toggleTheme"
      @action="onHeaderAction"
    />

    <section class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(139,92,246,0.22),transparent_40%),radial-gradient(circle_at_80%_26%,rgba(236,72,153,0.16),transparent_38%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.14),transparent_35%)]"
      />
      <div
        class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_35%)]"
      />

      <div
        class="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-10"
      >
        <!-- Hero text -->
        <div>
          <p
            class="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-white/5 px-3 py-1 text-xs font-medium text-violet-200 shadow-sm"
          >
            <span class="mdi mdi-star-four-points-outline text-sm" />
            New arrivals • Top-rated picks • Limited-time deals
          </p>

          <h1
            class="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Upgrade your everyday tech in one place.
          </h1>

          <p
            class="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg"
          >
            Shop headphones, wearables, keyboards, and essentials with fast
            shipping, secure checkout, and support that actually answers.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(139,92,246,0.28)] transition hover:-translate-y-0.5 hover:from-violet-400 hover:to-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
            >
              Shop new arrivals
              <span class="mdi mdi-arrow-right text-base" />
            </button>

            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 shadow-sm transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
            >
              View best sellers
              <span class="mdi mdi-play-circle-outline text-base" />
            </button>
          </div>
        </div>

        <!-- Hero visual -->
        <div class="relative">
          <div
            class="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-violet-500/20 blur-3xl sm:-left-8 sm:-top-8 sm:h-32 sm:w-32 lg:h-40 lg:w-40"
          />
          <div
            class="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl sm:-bottom-8 sm:-right-8 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
          />

          <div class="relative grid gap-4 sm:grid-cols-2 sm:gap-5">
            <div
              class="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur sm: sm:p-5"
            >
              <div
                class="aspect-[4/5] rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900"
              />
              <div class="mt-4">
                <p class="text-sm font-medium text-white">Headphones Pro X</p>
                <p class="text-sm text-slate-400">
                  Spatial audio • Active noise cancelling
                </p>
                <div class="mt-3 flex items-center justify-between">
                  <span class="text-sm font-semibold text-white">R$ 1.299</span>
                  <button
                    type="button"
                    class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
                    aria-label="Add Headphones Pro X"
                  >
                    <span class="mdi mdi-plus text-lg" />
                  </button>
                </div>
              </div>
            </div>

            <!-- COLUNA DIREITA: 2 cards que "somam" a altura do vertical -->
            <div class="grid gap-4 sm:gap-5 sm:h-full sm:grid-rows-2">
              <div
                class="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur sm:p-5"
              >
                <div
                  class="flex-1 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900"
                />
                <div class="mt-4">
                  <p class="text-sm font-medium text-white">Smartwatch One</p>
                  <p class="text-sm text-slate-400">
                    Health tracking • Workouts • Notifications
                  </p>
                  <p class="mt-2 text-sm font-semibold text-white">R$ 899</p>
                </div>
              </div>

              <div
                class="flex h-full flex-col justify-between rounded-3xl border border-violet-300/20 bg-gradient-to-br from-violet-600/25 to-fuchsia-600/25 p-5 text-white shadow-sm backdrop-blur sm:p-6"
              >
                <div>
                  <p class="text-xs uppercase tracking-[0.16em] text-white/70">
                    Deal of the week
                  </p>
                  <p class="mt-2 text-lg font-medium leading-tight">
                    Up to 30% off selected accessories.
                  </p>
                </div>

                <button
                  type="button"
                  class="mt-4 inline-flex items-center gap-2 self-start rounded-xl bg-white px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  Shop deals
                  <span class="mdi mdi-arrow-top-right text-base" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- LOGOS / SOCIAL PROOF -->
      <section class="border-y border-white/10 bg-white/[0.02]">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p
            class="mb-4 text-center text-xs font-medium uppercase tracking-[0.14em] text-slate-400"
          >
            Featured brands and partners
          </p>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <div
              v-for="brand in brands"
              :key="brand"
              class="flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-slate-300 shadow-sm transition hover:border-violet-300/20 hover:text-violet-200"
            >
              {{ brand }}
            </div>
          </div>
        </div>
      </section>
    </section>

    <section class="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div
        class="grid gap-4 sm:gap-5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]"
      >
        <div
          v-for="(p, idx) in productRow"
          :key="idx"
          class="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur sm:p-5"
        >
          <div
            class="aspect-[4/5] rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900"
          />
          <div class="mt-4">
            <p class="text-sm font-medium text-white">{{ p.name }}</p>
            <p class="text-sm text-slate-400">{{ p.desc }}</p>
            <div class="mt-3 flex items-center justify-between">
              <span class="text-sm font-semibold text-white">{{
                p.price
              }}</span>
              <button
                type="button"
                class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
                :aria-label="`Add ${p.name}`"
              >
                <span class="mdi mdi-plus text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppShell>
</template>

<script setup>
import AppHeader from "../components/layout/AppHeader.vue";
import AppShell from "../components/layout/AppShell.vue";

const navItems = [
  { label: "Produtos", href: "#produtos" },
  { label: "Ofertas", href: "#ofertas" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
];

const brands = ["NOVA", "LUMA", "ATLAS", "ORBIT", "MODU", "AUREA"];

const productRow = Array.from({ length: 12 }).map(() => ({
  name: "Headphones Pro X",
  desc: "Spatial audio • Active noise cancelling",
  price: "R$ 1.299",
}));

const headerActions = [
  {
    type: "theme-toggle",
    iconDark: "mdi-weather-sunny",
    iconLight: "mdi-weather-night",
    labelLight: "Light",
    labelDark: "Dark",
    ariaLabelLight: "Ativar tema claro",
    ariaLabelDark: "Ativar tema escuro",
    showOn: "both",
  },
  {
    type: "icon",
    icon: "mdi-magnify",
    ariaLabel: "Buscar",
    showOn: "both",
  },
  {
    type: "icon",
    icon: "mdi-cart-outline",
    ariaLabel: "Carrinho",
    badge: 2,
    showOn: "both",
  },
  {
    type: "button",
    label: "Entrar",
    variant: "primary",
    size: "sm",
    className:
      "hidden md:inline-flex h-10 rounded-xl px-4 shadow-[0_8px_20px_rgba(139,92,246,0.25)]",
    showOn: "desktop",
    showInMobileMenu: true,
  },
];

function onHeaderAction(action) {
  if (action.ariaLabel === "Buscar") console.log("abrir busca");
  if (action.ariaLabel === "Carrinho") console.log("abrir carrinho");
  if (action.label === "Entrar") console.log("login");
}
</script>

<style scoped></style>
