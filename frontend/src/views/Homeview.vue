<template>
  <AppShell v-slot="{ isDark, toggleTheme }">
    <AppHeader
      :is-dark="isDark"
      :brand="brand"
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
              v-for="brandName in brands"
              :key="brandName"
              class="flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-slate-300 shadow-sm transition hover:border-violet-300/20 hover:text-violet-200"
            >
              {{ brandName }}
            </div>
          </div>
        </div>
      </section>
    </section>

    <CategoriesSection
      id="categories"
      :kicker="categoriesKicker"
      :title="categoriesTitle"
      :action="categoriesAction"
      :categories="categories"
      @action="onCategoriesAction"
      @select="onSelectCategory"
    />

    <section
      id="produtos"
      class="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div class="mb-8">
        <p class="text-sm font-medium text-violet-300">Featured</p>
        <h2
          class="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          Trending now
        </h2>
      </div>

      <div
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5"
      >
        <ProductCard
          v-for="(product, idx) in productRow.slice(0, 5)"
          :key="product.id ?? idx"
          :product="product"
          @add="onAddProduct"
        />
      </div>
    </section>

    <FeatureSplitSection
      section-id="new"
      :main-card="featureMainCard"
      :top-cards="featureTopCards"
      :bottom-card="featureBottomCard"
      @primary-click="onFeaturePrimaryClick"
      @secondary-click="onFeatureSecondaryClick"
      @bottom-action-click="onFeatureBottomActionClick"
    />

    <TestimonialsSection
      :eyebrow="testimonialsEyebrow"
      :title="testimonialsTitle"
      :testimonials="testimonials"
    />
  </AppShell>
</template>

<script setup>
import AppHeader from "../components/layout/AppHeader.vue";
import AppShell from "../components/layout/AppShell.vue";
import CategoriesSection from "../components/ui/CategoriesSection.vue";
import ProductCard from "../components/ui/ProductCard.vue";
import FeatureSplitSection from "../components/ui/FeatureSplitSection.vue";
import TestimonialsSection from "../components/ui/TestimonialsSection.vue";

const brand = {
  href: "#",
  short: "CK",
  title: "CommerceKit",
  subtitle: "premium store experience",
  ariaLabel: "CommerceKit - Ir para o topo",
};

const navItems = [
  { label: "Produtos", href: "#produtos" },
  { label: "Ofertas", href: "#ofertas" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
];

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

const brands = ["NOVA", "LUMA", "ATLAS", "ORBIT", "MODU", "AUREA"];

const categoriesKicker = "Categories";
const categoriesTitle = "Shop by category";
const categoriesAction = { label: "View all", icon: "mdi-arrow-right" };

const categories = [
  {
    title: "Audio",
    description:
      "Headphones, speakers, and accessories for clear sound and deep bass.",
    items: 42,
    icon: "mdi-headphones",
  },
  {
    title: "Wearables",
    description:
      "Smartwatches and fitness devices for health tracking and daily convenience.",
    items: 28,
    icon: "mdi-watch-variant",
  },
  {
    title: "Workspace",
    description:
      "Keyboards, mice, and desk essentials for a clean and productive setup.",
    items: 35,
    icon: "mdi-monitor-dashboard",
  },
  {
    title: "Accessories",
    description:
      "Cables, chargers, hubs, and everyday add-ons that keep you powered.",
    items: 51,
    icon: "mdi-briefcase-outline",
  },
];

const productRow = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: "Headphones Pro X",
  desc: "Spatial audio • Active noise cancelling",
  price: "R$ 1.299",
}));

const featureMainCard = {
  eyebrow: "Curated picks",
  title: "Premium gear, built for real life.",
  description:
    "Thoughtfully selected electronics with reliable build quality and modern design—made for work, travel, and everything in between.",
  items: [
    {
      text: "Trusted picks focused on durability and performance.",
      icon: "mdi mdi-check-circle-outline",
    },
    {
      text: "Fast, mobile-first checkout with secure payments.",
      icon: "mdi mdi-check-circle-outline",
    },
    {
      text: "Dedicated support before and after your purchase.",
      icon: "mdi mdi-check-circle-outline",
    },
  ],
  primaryAction: {
    label: "Shop now",
    icon: "mdi mdi-arrow-right",
  },
  secondaryAction: {
    label: "Learn more",
    icon: "mdi mdi-information-outline",
  },
};

const featureTopCards = [
  {
    eyebrow: "Shipping",
    title: "Express",
    description:
      "Fast delivery to selected regions with real-time tracking updates.",
    variant: "highlight",
    placeholderClass: "mt-6 h-32 rounded-2xl border border-white/10 bg-white/5",
  },
  {
    eyebrow: "Payments",
    title: "Flexible",
    description:
      "PIX, cards, boleto, and installment options where available.",
    variant: "default",
    placeholderClass:
      "mt-6 h-32 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900",
  },
];

const featureBottomCard = {
  eyebrow: "Member benefit",
  title: "Early access to drops and deals",
  description:
    "Get notified about launches, seasonal offers, and limited releases before they go public.",
  action: {
    label: "Join the list",
    icon: "mdi mdi-email-outline",
  },
};

const testimonialsEyebrow = "Reviews";
const testimonialsTitle = "What customers say";

const testimonials = [
  {
    name: "Daniel Foster",
    role: "Verified Customer",
    comment:
      "Amazing sound quality and fast delivery. The headphones exceeded my expectations.",
  },
  {
    name: "Olivia Bennett",
    role: "Tech Enthusiast",
    comment:
      "Great customer service and premium build quality. I’ll definitely buy again.",
  },
  {
    name: "Marcus Chen",
    role: "Content Creator",
    comment:
      "Perfect gear for my workspace. Clean design and excellent performance.",
  },
];

function onHeaderAction(action) {
  if (action?.ariaLabel === "Buscar") console.log("abrir busca");
  if (action?.ariaLabel === "Carrinho") console.log("abrir carrinho");
  if (action?.label === "Entrar") console.log("login");
}

function onCategoriesAction(action) {
  if (action?.label === "View all") console.log("view all categories");
}

function onSelectCategory(category) {
  console.log("select category:", category);
}

function onAddProduct(product) {
  console.log("add product:", product);
}

function onFeaturePrimaryClick(action) {
  console.log("feature primary action:", action);
}

function onFeatureSecondaryClick(action) {
  console.log("feature secondary action:", action);
}

function onFeatureBottomActionClick(action) {
  console.log("feature bottom action:", action);
}
</script>