<template>
  <div
    :class="[
      'min-h-screen transition-colors duration-300',
      isDark
        ? 'theme-dark bg-slate-950 text-slate-100 selection:bg-violet-300/30 selection:text-white'
        : 'theme-light bg-slate-50 text-slate-900 selection:bg-violet-200/60 selection:text-violet-950',
    ]"
  >
    <!-- HEADER -->
    <header
      class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
    >
      <div
        class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <!-- Brand -->
        <a
          href="#"
          class="flex items-center gap-3"
          aria-label="CommerceKit - Ir para o topo"
        >
          <div
            class="grid h-9 w-9 place-items-center rounded-xl border border-violet-400/30 bg-white/5 shadow-[0_8px_24px_rgba(139,92,246,0.15)]"
          >
            <span class="text-sm font-bold tracking-tight text-violet-300"
              >CK</span
            >
          </div>
          <div class="leading-tight">
            <p class="text-sm font-semibold tracking-tight text-white">
              CommerceKit
            </p>
            <p class="text-[11px] text-slate-400">premium store experience</p>
          </div>
        </a>

        <!-- Nav desktop -->
        <nav
          class="hidden items-center gap-7 md:flex"
          aria-label="Navegação principal"
        >
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="text-sm text-slate-300 transition hover:text-violet-300"
          >
            {{ item.label }}
          </a>
        </nav>
        <button
          type="button"
          class="inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium shadow-sm transition focus:outline-none"
          :class="
            isDark
              ? 'border-white/10 bg-white/5 text-slate-200 hover:border-violet-400/30 hover:bg-violet-500/10 focus:ring-2 focus:ring-violet-400/30'
              : 'border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50 focus:ring-2 focus:ring-violet-200'
          "
          :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
          @click="toggleTheme"
        >
          <span
            :class="
              isDark
                ? 'mdi mdi-weather-sunny text-[18px]'
                : 'mdi mdi-weather-night text-[18px]'
            "
          />
          <span class="hidden sm:inline">{{ isDark ? "Light" : "Dark" }}</span>
        </button>
        <!-- Actions -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 shadow-sm transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
            aria-label="Buscar"
          >
            <span class="mdi mdi-magnify text-[20px]" />
          </button>

          <button
            type="button"
            class="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 shadow-sm transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
            aria-label="Carrinho"
          >
            <span class="mdi mdi-cart-outline text-[20px]" />
            <span
              class="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] font-semibold text-white shadow-sm"
            >
              2
            </span>
          </button>

          <button
            type="button"
            class="hidden rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white shadow-[0_8px_20px_rgba(139,92,246,0.25)] transition hover:from-violet-400 hover:to-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30 md:inline-flex"
          >
            Entrar
          </button>

          <!-- Mobile menu button -->
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 shadow-sm transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30 md:hidden"
            :aria-expanded="isMobileMenuOpen ? 'true' : 'false'"
            aria-controls="mobile-menu"
            aria-label="Abrir menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <span
              :class="
                isMobileMenuOpen
                  ? 'mdi mdi-close text-[20px]'
                  : 'mdi mdi-menu text-[20px]'
              "
            />
          </button>
        </div>
      </div>

      <!-- Mobile nav -->
      <div
        v-show="isMobileMenuOpen"
        id="mobile-menu"
        class="border-t border-white/10 bg-slate-950/95 md:hidden"
      >
        <nav
          class="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6"
          aria-label="Navegação mobile"
        >
          <a
            v-for="item in navItems"
            :key="`mobile-${item.href}`"
            :href="item.href"
            class="rounded-lg px-2 py-2 text-sm text-slate-200 transition hover:bg-violet-500/10 hover:text-violet-200"
            @click="isMobileMenuOpen = false"
          >
            {{ item.label }}
          </a>

          <button
            type="button"
            class="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white transition hover:from-violet-400 hover:to-fuchsia-400"
          >
            Entrar
          </button>
        </nav>
      </div>
    </header>

    <!-- HERO -->
    <section class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(139,92,246,0.22),transparent_40%),radial-gradient(circle_at_80%_26%,rgba(236,72,153,0.16),transparent_38%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.14),transparent_35%)]"
      />
      <div
        class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_35%)]"
      />

      <div
        class="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24"
      >
        <!-- Hero text -->
        <div>
          <p
            class="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-white/5 px-3 py-1 text-xs font-medium text-violet-200 shadow-sm"
          >
            <span class="mdi mdi-star-four-points-outline text-sm" />
            Nova coleção • Design autoral • Curadoria premium
          </p>

          <h1
            class="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            E-commerce com estética premium e performance real.
          </h1>

          <p
            class="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg"
          >
            Descubra produtos com design moderno, acabamento impecável e
            experiência de compra pensada nos detalhes — do primeiro clique ao
            checkout.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(139,92,246,0.28)] transition hover:-translate-y-0.5 hover:from-violet-400 hover:to-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
            >
              Explorar coleção
              <span class="mdi mdi-arrow-right text-base" />
            </button>

            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 shadow-sm transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
            >
              Ver lançamentos
              <span class="mdi mdi-play-circle-outline text-base" />
            </button>
          </div>

          <div
            class="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur"
          >
            <div>
              <p class="text-2xl font-semibold tracking-tight text-white">
                +12k
              </p>
              <p class="text-xs text-slate-400">Clientes satisfeitos</p>
            </div>
            <div>
              <p class="text-2xl font-semibold tracking-tight text-white">
                4.9
              </p>
              <p class="text-xs text-slate-400">Avaliação média</p>
            </div>
            <div>
              <p class="text-2xl font-semibold tracking-tight text-white">
                24h
              </p>
              <p class="text-xs text-slate-400">Envio prioritário</p>
            </div>
          </div>
        </div>

        <!-- Hero visual -->
        <div class="relative">
          <div
            class="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl"
          />
          <div
            class="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl"
          />

          <div class="relative grid gap-4 sm:grid-cols-2">
            <div
              class="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur sm:mt-8"
            >
              <div
                class="aspect-[4/5] rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900"
              />
              <div class="mt-4">
                <p class="text-sm font-medium text-white">Headphones Pro X</p>
                <p class="text-sm text-slate-400">Áudio imersivo • ANC</p>
                <div class="mt-3 flex items-center justify-between">
                  <span class="text-sm font-semibold text-white">R$ 1.299</span>
                  <button
                    type="button"
                    class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
                    aria-label="Adicionar Headphones Pro X"
                  >
                    <span class="mdi mdi-plus text-lg" />
                  </button>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div
                class="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur"
              >
                <div
                  class="aspect-[4/3] rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900"
                />
                <div class="mt-4">
                  <p class="text-sm font-medium text-white">Smartwatch One</p>
                  <p class="text-sm text-slate-400">Saúde • Rotina • Estilo</p>
                  <p class="mt-2 text-sm font-semibold text-white">R$ 899</p>
                </div>
              </div>

              <div
                class="rounded-3xl border border-violet-300/20 bg-gradient-to-br from-violet-600/25 to-fuchsia-600/25 p-5 text-white shadow-sm backdrop-blur"
              >
                <p class="text-xs uppercase tracking-[0.16em] text-white/70">
                  Oferta da semana
                </p>
                <p class="mt-2 text-lg font-medium leading-tight">
                  Até 30% OFF em acessórios selecionados.
                </p>
                <button
                  type="button"
                  class="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  Aproveitar
                  <span class="mdi mdi-arrow-top-right text-base" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LOGOS / SOCIAL PROOF -->
    <section class="border-y border-white/10 bg-white/[0.02]">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p
          class="mb-4 text-center text-xs font-medium uppercase tracking-[0.14em] text-slate-400"
        >
          Marcas e parceiros em destaque
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

    <!-- CATEGORIES -->
    <section
      id="categorias"
      class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div class="mb-8 flex items-end justify-between gap-4">
        <div>
          <p class="text-sm font-medium text-violet-300">Categorias</p>
          <h2
            class="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Explore por estilo de uso
          </h2>
        </div>

        <button
          type="button"
          class="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30 sm:inline-flex"
        >
          Ver tudo
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
            <span class="text-xs font-medium text-slate-400"
              >{{ category.items }} itens</span
            >
            <span
              class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition group-hover:border-violet-400 group-hover:bg-violet-500 group-hover:text-white"
            >
              <span class="mdi mdi-arrow-right" />
            </span>
          </div>
        </article>
      </div>
    </section>

    <!-- FEATURED PRODUCTS -->
    <section
      id="destaques"
      class="bg-gradient-to-b from-transparent to-violet-500/[0.04]"
    >
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mb-8 flex items-end justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-violet-300">Destaques</p>
            <h2
              class="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              Produtos em alta
            </h2>
          </div>

          <div class="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 shadow-sm transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
              aria-label="Anterior"
            >
              <span class="mdi mdi-chevron-left text-lg" />
            </button>
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 shadow-sm transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
              aria-label="Próximo"
            >
              <span class="mdi mdi-chevron-right text-lg" />
            </button>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="product in featuredProducts"
            :key="product.id"
            class="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-violet-300/20 hover:bg-white/[0.07] hover:shadow-md"
          >
            <div class="relative p-4">
              <span
                v-if="product.badge"
                class="absolute left-4 top-4 z-10 rounded-full border border-violet-300/15 bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-200 shadow-sm"
              >
                {{ product.badge }}
              </span>

              <button
                type="button"
                class="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 shadow-sm transition hover:border-pink-300/20 hover:bg-pink-500/10 hover:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400/30"
                :aria-label="`Favoritar ${product.name}`"
              >
                <span class="mdi mdi-heart-outline text-lg" />
              </button>

              <div
                class="aspect-square rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 transition group-hover:scale-[1.01]"
              />
            </div>

            <div class="border-t border-white/10 px-4 py-4">
              <p class="text-sm text-slate-400">{{ product.category }}</p>
              <h3
                class="mt-1 text-base font-semibold tracking-tight text-white"
              >
                {{ product.name }}
              </h3>

              <div class="mt-2 flex items-center gap-1 text-amber-400">
                <span class="mdi mdi-star text-sm" />
                <span class="mdi mdi-star text-sm" />
                <span class="mdi mdi-star text-sm" />
                <span class="mdi mdi-star text-sm" />
                <span class="mdi mdi-star-half-full text-sm" />
                <span class="ml-1 text-xs text-slate-400">{{
                  product.rating
                }}</span>
              </div>

              <div class="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p class="text-sm font-semibold text-white">
                    {{ product.price }}
                  </p>
                  <p
                    v-if="product.oldPrice"
                    class="text-xs text-slate-500 line-through"
                  >
                    {{ product.oldPrice }}
                  </p>
                </div>

                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-2 text-sm font-medium text-white transition hover:from-violet-400 hover:to-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
                >
                  <span class="mdi mdi-cart-plus text-base" />
                  Comprar
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FEATURE / SPLIT SECTION -->
    <section
      id="novidades"
      class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div class="grid gap-6 lg:grid-cols-2">
        <div
          class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur sm:p-8"
        >
          <p class="text-sm font-medium text-violet-300">Coleção premium</p>
          <h2
            class="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Design sofisticado, experiência sem fricção.
          </h2>
          <p class="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            Produtos selecionados com foco em acabamento, durabilidade e
            estética contemporânea. Ideal para quem busca funcionalidade e
            presença visual no dia a dia.
          </p>

          <ul class="mt-6 space-y-3">
            <li class="flex items-start gap-3 text-sm text-slate-200">
              <span
                class="mdi mdi-check-circle-outline mt-0.5 text-lg text-violet-300"
              />
              Curadoria com foco em estilo e performance.
            </li>
            <li class="flex items-start gap-3 text-sm text-slate-200">
              <span
                class="mdi mdi-check-circle-outline mt-0.5 text-lg text-violet-300"
              />
              Checkout rápido e otimizado para mobile.
            </li>
            <li class="flex items-start gap-3 text-sm text-slate-200">
              <span
                class="mdi mdi-check-circle-outline mt-0.5 text-lg text-violet-300"
              />
              Pós-venda com suporte dedicado.
            </li>
          </ul>

          <div class="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-medium text-white transition hover:from-violet-400 hover:to-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
            >
              Comprar agora
              <span class="mdi mdi-arrow-right text-base" />
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
            >
              Saiba mais
              <span class="mdi mdi-information-outline text-base" />
            </button>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div
            class="rounded-3xl border border-violet-300/20 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 p-6 text-white shadow-sm backdrop-blur"
          >
            <p class="text-xs uppercase tracking-[0.14em] text-white/70">
              Entrega
            </p>
            <p class="mt-2 text-2xl font-semibold tracking-tight">Expressa</p>
            <p class="mt-3 text-sm leading-6 text-white/80">
              Frete rápido para regiões selecionadas com rastreio em tempo real.
            </p>
            <div
              class="mt-6 h-32 rounded-2xl border border-white/10 bg-white/5"
            />
          </div>

          <div
            class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur"
          >
            <p class="text-xs uppercase tracking-[0.14em] text-slate-400">
              Pagamento
            </p>
            <p class="mt-2 text-2xl font-semibold tracking-tight text-white">
              Flexível
            </p>
            <p class="mt-3 text-sm leading-6 text-slate-300">
              Pix, cartão, boleto e parcelamento em condições especiais.
            </p>
            <div
              class="mt-6 h-32 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900"
            />
          </div>

          <div
            class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur sm:col-span-2"
          >
            <div
              class="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"
            >
              <div>
                <p class="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Benefício exclusivo
                </p>
                <p
                  class="mt-2 text-2xl font-semibold tracking-tight text-white"
                >
                  Membros ganham acesso antecipado
                </p>
                <p class="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                  Receba lançamentos, ofertas sazonais e coleções limitadas
                  antes da liberação geral.
                </p>
              </div>

              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 shadow-sm transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
              >
                Entrar na lista
                <span class="mdi mdi-email-outline text-base" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section id="depoimentos" class="bg-white/[0.02]">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mb-8">
          <p class="text-sm font-medium text-violet-300">Depoimentos</p>
          <h2
            class="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            O que os clientes dizem
          </h2>
        </div>

        <div class="grid gap-4 lg:grid-cols-3">
          <article
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur transition hover:border-violet-300/20 hover:bg-white/[0.07] hover:shadow-md"
          >
            <div class="mb-4 flex items-center gap-1 text-amber-400">
              <span class="mdi mdi-star text-base" />
              <span class="mdi mdi-star text-base" />
              <span class="mdi mdi-star text-base" />
              <span class="mdi mdi-star text-base" />
              <span class="mdi mdi-star text-base" />
            </div>

            <p class="text-sm leading-7 text-slate-200">
              “{{ testimonial.comment }}”
            </p>

            <div class="mt-6 flex items-center gap-3">
              <div
                class="h-11 w-11 rounded-full bg-gradient-to-b from-violet-300/40 to-fuchsia-400/40"
              />
              <div>
                <p class="text-sm font-semibold text-white">
                  {{ testimonial.name }}
                </p>
                <p class="text-xs text-slate-400">{{ testimonial.role }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER / CTA -->
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div
        class="rounded-3xl border border-violet-300/15 bg-gradient-to-br from-white/5 to-violet-500/10 p-6 shadow-sm backdrop-blur sm:p-8 lg:p-10"
      >
        <div class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p class="text-sm font-medium text-violet-300">Newsletter</p>
            <h2
              class="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              Receba novidades e ofertas selecionadas.
            </h2>
            <p
              class="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base"
            >
              Assine para acompanhar lançamentos, drops especiais e conteúdos
              com curadoria de design e tecnologia.
            </p>
          </div>

          <form class="space-y-3" @submit.prevent="handleNewsletterSubmit">
            <div class="flex flex-col gap-3 sm:flex-row">
              <label for="newsletter-email" class="sr-only">E-mail</label>
              <input
                id="newsletter-email"
                v-model="newsletterEmail"
                type="email"
                placeholder="Seu melhor e-mail"
                class="h-12 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-violet-300/30 focus:ring-2 focus:ring-violet-400/20"
                required
              />
              <button
                type="submit"
                class="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 text-sm font-medium text-white transition hover:from-violet-400 hover:to-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
              >
                Assinar
                <span class="mdi mdi-arrow-right text-base" />
              </button>
            </div>
            <p class="text-xs leading-5 text-slate-400">
              Ao assinar, você concorda com nossa política de privacidade e
              comunicações promocionais.
            </p>
          </form>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-white/10 bg-black/30">
      <div
        class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8"
      >
        <div>
          <div class="flex items-center gap-3">
            <div
              class="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 shadow-sm"
            >
              <span class="text-sm font-bold tracking-tight text-violet-300"
                >CK</span
              >
            </div>
            <div class="leading-tight">
              <p class="text-sm font-semibold tracking-tight text-white">
                CommerceKit
              </p>
              <p class="text-[11px] text-slate-400">premium store experience</p>
            </div>
          </div>
          <p class="mt-4 text-sm leading-6 text-slate-400">
            Experiência de e-commerce moderna, elegante e orientada a
            performance.
          </p>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-white">Loja</h3>
          <ul class="mt-4 space-y-2 text-sm text-slate-400">
            <li>
              <a href="#" class="transition hover:text-violet-300">Novidades</a>
            </li>
            <li>
              <a href="#" class="transition hover:text-violet-300"
                >Mais vendidos</a
              >
            </li>
            <li>
              <a href="#" class="transition hover:text-violet-300">Coleções</a>
            </li>
            <li>
              <a href="#" class="transition hover:text-violet-300">Ofertas</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-white">Suporte</h3>
          <ul class="mt-4 space-y-2 text-sm text-slate-400">
            <li>
              <a href="#" class="transition hover:text-violet-300"
                >Central de ajuda</a
              >
            </li>
            <li>
              <a href="#" class="transition hover:text-violet-300"
                >Trocas e devoluções</a
              >
            </li>
            <li>
              <a href="#" class="transition hover:text-violet-300">Entregas</a>
            </li>
            <li>
              <a href="#" class="transition hover:text-violet-300">Contato</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-white">Institucional</h3>
          <ul class="mt-4 space-y-2 text-sm text-slate-400">
            <li>
              <a href="#" class="transition hover:text-violet-300">Sobre</a>
            </li>
            <li>
              <a href="#" class="transition hover:text-violet-300">Carreiras</a>
            </li>
            <li>
              <a href="#" class="transition hover:text-violet-300"
                >Privacidade</a
              >
            </li>
            <li>
              <a href="#" class="transition hover:text-violet-300">Termos</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/10">
        <div
          class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"
        >
          <p>© 2026 CommerceKit. Todos os direitos reservados.</p>
          <div class="flex items-center gap-3">
            <a href="#" class="transition hover:text-violet-300">Instagram</a>
            <span>•</span>
            <a href="#" class="transition hover:text-violet-300">Behance</a>
            <span>•</span>
            <a href="#" class="transition hover:text-violet-300">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const isMobileMenuOpen = ref(false);
const newsletterEmail = ref("");
const isDark = ref(true); // começa no dark

function toggleTheme() {
  isDark.value = !isDark.value;
}

onMounted(() => {
  const saved = localStorage.getItem("commercekit-theme");
  if (saved === "light") isDark.value = false;
  if (saved === "dark") isDark.value = true;
});

watch(isDark, (value) => {
  localStorage.setItem("commercekit-theme", value ? "dark" : "light");
});

const navItems = [
  { label: "Novidades", href: "#novidades" },
  { label: "Categorias", href: "#categorias" },
  { label: "Destaques", href: "#destaques" },
  { label: "Depoimentos", href: "#depoimentos" },
];

const brands = ["NOVA", "LUMA", "ATLAS", "ORBIT", "MODU", "AUREA"];

const categories = [
  {
    title: "Áudio",
    description:
      "Fones, caixas e acessórios para uma experiência sonora premium.",
    items: 42,
    icon: "mdi-headphones",
  },
  {
    title: "Wearables",
    description: "Relógios e dispositivos para rotina, saúde e produtividade.",
    items: 28,
    icon: "mdi-watch-variant",
  },
  {
    title: "Workspace",
    description: "Itens para setup moderno, confortável e minimalista.",
    items: 35,
    icon: "mdi-monitor-dashboard",
  },
  {
    title: "Lifestyle",
    description: "Produtos versáteis para mobilidade, estilo e dia a dia.",
    items: 51,
    icon: "mdi-briefcase-outline",
  },
];

const featuredProducts = [
  {
    id: 1,
    badge: "Novo",
    category: "Áudio",
    name: "Headphones Pro X",
    rating: "(324 avaliações)",
    price: "R$ 1.299",
    oldPrice: "R$ 1.499",
  },
  {
    id: 2,
    badge: "Best Seller",
    category: "Wearables",
    name: "Smartwatch One",
    rating: "(198 avaliações)",
    price: "R$ 899",
  },
  {
    id: 3,
    badge: "Oferta",
    category: "Workspace",
    name: "Keyboard Air Slim",
    rating: "(276 avaliações)",
    price: "R$ 549",
    oldPrice: "R$ 699",
  },
  {
    id: 4,
    badge: "",
    category: "Lifestyle",
    name: "Bag Urban Pro",
    rating: "(143 avaliações)",
    price: "R$ 429",
  },
];

const testimonials = [
  {
    name: "Marina Oliveira",
    role: "Designer de Produto",
    comment:
      "A experiência é impecável. O visual da loja é lindo, os produtos são bem apresentados e o checkout é muito fluido.",
  },
  {
    name: "Rafael Costa",
    role: "Desenvolvedor Front-end",
    comment:
      "Curti muito a navegação e o cuidado nos detalhes. Passa uma sensação premium de ponta a ponta.",
  },
  {
    name: "Isabela Martins",
    role: "Arquiteta",
    comment:
      "Comprei pela estética e voltei pela praticidade. Entrega rápida, embalagem excelente e ótima comunicação.",
  },
];

function handleNewsletterSubmit() {
  console.log("Newsletter:", newsletterEmail.value);
  newsletterEmail.value = "";
}
</script>

<style scoped>

.theme-light {
  --ck-bg: #f8fafc;            /* slate-50 */
  --ck-surface: #ffffff;
  --ck-surface-soft: #f8fafc;
  --ck-border: #e2e8f0;        /* slate-200 */
  --ck-text: #0f172a;          /* slate-900 */
  --ck-text-muted: #64748b;    /* slate-500 */
  --ck-accent: #8b5cf6;        /* violet-500 */
  --ck-accent-2: #d946ef;      /* fuchsia-500 */
  --ck-glow-1: rgba(139, 92, 246, 0.12);
  --ck-glow-2: rgba(217, 70, 239, 0.10);
  --ck-card-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 10px 30px rgba(15, 23, 42, 0.06);
}

.theme-dark {
  --ck-bg: #020617;
  --ck-surface: rgba(255, 255, 255, 0.05);
  --ck-surface-soft: rgba(255, 255, 255, 0.03);
  --ck-border: rgba(255, 255, 255, 0.10);
  --ck-text: #f8fafc;
  --ck-text-muted: #94a3b8;
  --ck-accent: #8b5cf6;
  --ck-accent-2: #d946ef;
  --ck-glow-1: rgba(139, 92, 246, 0.22);
  --ck-glow-2: rgba(236, 72, 153, 0.16);
  --ck-card-shadow: 0 8px 24px rgba(2, 6, 23, 0.18);
}


.theme-light header {
  border-color: rgba(226, 232, 240, 0.9) !important;
  background: rgba(248, 250, 252, 0.82) !important;
}

/* Cards, blocos, superfícies “glass” */
.theme-light :deep(.bg-white\/5),
.theme-light :deep(.bg-white\/\[0\.02\]),
.theme-light :deep(.bg-black\/30) {
  background-color: rgba(255, 255, 255, 0.88) !important;
  backdrop-filter: blur(10px);
}

.theme-light :deep(.border-white\/10) {
  border-color: #e2e8f0 !important;
}

.theme-light :deep(.text-white) {
  color: #0f172a !important;
}

.theme-light :deep(.text-slate-100),
.theme-light :deep(.text-slate-200) {
  color: #1e293b !important;
}

.theme-light :deep(.text-slate-300),
.theme-light :deep(.text-slate-400) {
  color: #64748b !important;
}

.theme-light :deep(.text-slate-500) {
  color: #94a3b8 !important;
}

/* Botões e inputs dark específicos */
.theme-light :deep(.bg-slate-900\/70) {
  background-color: #ffffff !important;
}

.theme-light :deep(.from-slate-800),
.theme-light :deep(.to-slate-900) {
  --tw-gradient-from: #f1f5f9 var(--tw-gradient-from-position) !important;
  --tw-gradient-to: rgb(226 232 240 / 1) var(--tw-gradient-to-position) !important;
}

/* Seções que tinham fundo escuro */
.theme-light :deep(.bg-gradient-to-b.from-transparent.to-violet-500\/\[0\.04\]) {
  background-image: linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.03)) !important;
}

.theme-light :deep(.bg-white\/\[0\.02\]) {
  background-color: rgba(255, 255, 255, 0.55) !important;
}

/* Footer em light */
.theme-light footer {
  background: #ffffff !important;
  border-top-color: #e2e8f0 !important;
}

.theme-light footer :deep(.border-white\/10) {
  border-color: #e2e8f0 !important;
}

.theme-light footer :deep(.text-slate-400) {
  color: #64748b !important;
}

.theme-light footer :deep(.text-white) {
  color: #0f172a !important;
}

/* Sombras mais elegantes no light */
.theme-light :deep(.shadow-sm) {
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 6px 20px rgba(15, 23, 42, 0.05) !important;
}

/* Hover states com melhor contraste no light */
.theme-light :deep(.hover\:bg-violet-500\/10:hover) {
  background-color: rgba(139, 92, 246, 0.08) !important;
}

.theme-light :deep(.hover\:border-violet-300\/20:hover),
.theme-light :deep(.hover\:border-violet-400\/30:hover) {
  border-color: rgba(139, 92, 246, 0.28) !important;
}

/* Hero radial / brilho no light */
.theme-light section:first-of-type > .absolute.inset-0 {
  opacity: 0.9;
}

/* Inputs no light */
.theme-light input {
  color: #0f172a !important;
  border-color: #e2e8f0 !important;
  background: #ffffff !important;
}

.theme-light input::placeholder {
  color: #94a3b8 !important;
}

/* Ajuste de textos com opacity branca no light */
.theme-light :deep(.text-white\/70) {
  color: rgba(15, 23, 42, 0.65) !important;
}
.theme-light :deep(.text-white\/80) {
  color: rgba(15, 23, 42, 0.78) !important;
}

/* Elementos decorativos */
.theme-light :deep(.bg-violet-500\/20) {
  background-color: rgba(139, 92, 246, 0.12) !important;
}
.theme-light :deep(.bg-fuchsia-500\/20) {
  background-color: rgba(217, 70, 239, 0.10) !important;
}
</style>