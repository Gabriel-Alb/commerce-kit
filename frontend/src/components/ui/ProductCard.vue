<template>
  <article
    class="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur sm:p-5"
  >
    <div class="aspect-[4/5] rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900" />

    <div class="mt-4">
      <p class="text-sm font-medium text-white">{{ product.name }}</p>
      <p class="text-sm text-slate-400">{{ product.desc }}</p>

      <div class="mt-3 flex items-center justify-between">
        <span class="text-sm font-semibold text-white">{{ product.price }}</span>

        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
          :aria-label="`Add ${product.name}`"
          @click="emitAdd"
        >
          <span class="mdi mdi-plus text-lg" />
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
export type ProductItem = {
  id?: string | number
  name: string
  desc: string
  price: string
  [k: string]: unknown
}

const props = defineProps<{
  product: ProductItem
}>()

const emit = defineEmits<{
  (e: "add", product: ProductItem): void
}>()

function emitAdd() {
  emit("add", props.product)
}
</script>