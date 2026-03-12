<template>
  <section :id="id" :class="sectionClass">
    <div :class="headerClass">
      <div>
        <p :class="kickerClass">{{ kicker }}</p>
        <h2 :class="titleClass">{{ title }}</h2>
      </div>

      <slot name="action">
        <button
          v-if="action"
          type="button"
          :class="actionBtnClass"
          @click="$emit('action', action)"
        >
          <span>{{ action.label }}</span>
          <span :class="['mdi text-base', action.icon || 'mdi-arrow-right']" />
        </button>
      </slot>
    </div>

    <div :class="gridClass">
      <slot
        name="card"
        v-for="(category, index) in categories"
        :key="getKey(category, index)"
        :category="category"
        :index="index"
      >
        <article :class="cardClass" @click="$emit('select', category)">
          <div :class="iconWrapClass">
            <span :class="['mdi text-2xl', category.icon]" />
          </div>

          <h3 :class="cardTitleClass">
            {{ category.title }}
          </h3>

          <p :class="cardDescClass">
            {{ category.description }}
          </p>

          <div :class="cardFooterClass">
            <span :class="itemsTextClass">
              {{ formatItems(category.items) }}
            </span>

            <span :class="arrowBtnClass">
              <span :class="['mdi', cardArrowIcon]" />
            </span>
          </div>
        </article>
      </slot>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  id: { type: String, default: "categories" },
  kicker: { type: String, default: "Categories" },
  title: { type: String, default: "Shop by category" },
  action: {
    type: Object,
    default: null,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  trackBy: { type: [String, Function], default: "title" },
  itemsSuffix: { type: String, default: "items" },
  itemsFormatter: { type: Function, default: null },
  cardArrowIcon: { type: String, default: "mdi-arrow-right" },
  sectionClass: {
    type: [String, Array, Object],
    default: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
  },
  headerClass: {
    type: [String, Array, Object],
    default: "mb-8 flex items-end justify-between gap-4",
  },
  kickerClass: {
    type: [String, Array, Object],
    default: "text-sm font-medium text-violet-300",
  },
  titleClass: {
    type: [String, Array, Object],
    default:
      "mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl",
  },
  actionBtnClass: {
    type: [String, Array, Object],
    default:
      "hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30 sm:inline-flex",
  },

  gridClass: {
    type: [String, Array, Object],
    default: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
  },
  cardClass: {
    type: [String, Array, Object],
    default:
      "group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-violet-300/20 hover:bg-white/[0.07] hover:shadow-md",
  },
  iconWrapClass: {
    type: [String, Array, Object],
    default:
      "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-500/10 text-violet-200",
  },
  cardTitleClass: {
    type: [String, Array, Object],
    default: "text-base font-semibold tracking-tight text-white",
  },
  cardDescClass: {
    type: [String, Array, Object],
    default: "mt-2 text-sm leading-6 text-slate-300",
  },
  cardFooterClass: {
    type: [String, Array, Object],
    default: "mt-4 flex items-center justify-between",
  },
  itemsTextClass: {
    type: [String, Array, Object],
    default: "text-xs font-medium text-slate-400",
  },
  arrowBtnClass: {
    type: [String, Array, Object],
    default:
      "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition group-hover:border-violet-400 group-hover:bg-violet-500 group-hover:text-white",
  },
});

defineEmits(["action", "select"]);

function getKey(category, index) {
  if (typeof props.trackBy === "function")
    return props.trackBy(category, index);
  const key = props.trackBy;
  return category?.[key] ?? index;
}

function formatItems(items) {
  if (props.itemsFormatter) return props.itemsFormatter(items);
  const n = Number(items ?? 0);
  return `${n} ${props.itemsSuffix}`;
}
</script>
