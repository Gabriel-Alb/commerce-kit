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
        class="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14 lg:px-8 lg:py-10"
      >
        <div class="space-y-10">
          <p
            class="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-white/5 px-3 py-1 text-xs font-medium text-violet-200 shadow-sm"
          >
            <span class="mdi mdi-star-four-points-outline text-sm" />
            New arrivals • Top-rated picks • Limited-time deals
          </p>

          <h1
            class="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Upgrade your everyday tech in one place.
          </h1>

          <p class="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Shop headphones, wearables, keyboards, and essentials with fast
            shipping, secure checkout, and support that actually answers.
          </p>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
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

        <div class="relative min-h-[220px] sm:min-h-[260px]">
          <div
            class="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-violet-500/20 blur-3xl sm:-left-8 sm:-top-8 sm:h-32 sm:w-32 lg:h-40 lg:w-40"
          />
          <div
            class="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl sm:-bottom-8 sm:-right-8 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
          />
        </div>
      </div>

      <section class="border-y border-white/10 bg-white/[0.02]">
        <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p
            class="mb-6 text-center text-xs font-medium uppercase tracking-[0.14em] text-slate-400"
          >
            Featured brands and partners
          </p>

          <div
            class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
          >
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

    <section
      id="categories"
      class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div class="mb-8 flex items-end justify-between gap-4">
        <div>
          <p class="text-sm font-medium text-violet-300">Categories</p>
          <h2
            class="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Shop by category
          </h2>
        </div>

        <button
          type="button"
          class="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30 sm:inline-flex"
        >
          View all
          <span class="mdi mdi-arrow-right text-base" />
        </button>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="category in categories"
          :key="category.title"
          class="group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-violet-300/20 hover:bg-white/[0.07] hover:shadow-md"
        >
          <div
            class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-500/10 text-violet-200"
          >
            <span :class="['mdi text-2xl', category.icon]" />
          </div>

          <h3 class="text-base font-semibold tracking-tight text-white">
            {{ category.title }}
          </h3>
          <p class="mt-2 text-sm leading-6 text-slate-300">
            {{ category.description }}
          </p>

          <div class="mt-4 flex items-center justify-between">
            <span class="text-xs font-medium text-slate-400">
              {{ category.items }} items
            </span>
            <span
              class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition group-hover:border-violet-400 group-hover:bg-violet-500 group-hover:text-white"
            >
              <span class="mdi mdi-arrow-right" />
            </span>
          </div>
        </article>
      </div>
    </section>

    <section
      id="produtos"
      class="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div class="mb-8 space-y-2">
        <h2 class="text-xl font-semibold tracking-tight text-slate-100">
          Products
        </h2>
        <p class="text-sm text-slate-300">
          Curated picks with great value — updated weekly.
        </p>
      </div>

      <div
        class="grid gap-4 sm:gap-5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]"
      >
        <ProductCard
          v-for="(p, idx) in productRow"
          :key="p.id ?? idx"
          :product="p"
          @add="onAddProduct"
        />
      </div>
    </section>
  </AppShell>
</template>

<script setup>
import AppHeader from "../components/layout/AppHeader.vue";
import AppShell from "../components/layout/AppShell.vue";
import ProductCard from "../components/ui/ProductCard.vue";

const navItems = [
  { label: "Produtos", href: "#produtos" },
  { label: "Ofertas", href: "#ofertas" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
];

const brands = ["NOVA", "LUMA", "ATLAS", "ORBIT", "MODU", "AUREA"];

const categories = [
  {
    title: "Headphones",
    description: "Wireless, ANC, studio and gaming models.",
    icon: "mdi-headphones",
    items: 128,
  },
  {
    title: "Wearables",
    description: "Smartwatches and fitness trackers for every day.",
    icon: "mdi-watch-variant",
    items: 64,
  },
  {
    title: "Keyboards",
    description: "Mechanical, low-profile and compact layouts.",
    icon: "mdi-keyboard",
    items: 42,
  },
  {
    title: "Accessories",
    description: "Chargers, hubs, cases and essential add-ons.",
    icon: "mdi-usb",
    items: 210,
  },
];

const productRow = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
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

function onAddProduct(product) {
  console.log("add product:", product);
}
</script>

<style scoped></style>
