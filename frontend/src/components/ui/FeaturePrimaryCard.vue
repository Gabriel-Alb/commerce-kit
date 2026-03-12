<template>
  <div
    class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur sm:p-8"
  >
    <p class="text-sm font-medium text-violet-300">
      {{ eyebrow }}
    </p>

    <h2
      class="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
    >
      {{ title }}
    </h2>

    <p class="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
      {{ description }}
    </p>

    <ul v-if="items?.length" class="mt-6 space-y-3">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-start gap-3 text-sm text-slate-200"
      >
        <span
          :class="[
            item.icon || 'mdi mdi-check-circle-outline',
            'mt-0.5 text-lg text-violet-300',
          ]"
        />
        <span>{{ item.text }}</span>
      </li>
    </ul>

    <div
      v-if="primaryAction || secondaryAction"
      class="mt-6 flex flex-wrap gap-3"
    >
      <button
        v-if="primaryAction"
        type="button"
        class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-medium text-white transition hover:from-violet-400 hover:to-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
        @click="$emit('primary-click', primaryAction)"
      >
        {{ primaryAction.label }}
        <span
          :class="[primaryAction.icon || 'mdi mdi-arrow-right', 'text-base']"
        />
      </button>

      <button
        v-if="secondaryAction"
        type="button"
        class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
        @click="$emit('secondary-click', secondaryAction)"
      >
        {{ secondaryAction.label }}
        <span
          :class="[
            secondaryAction.icon || 'mdi mdi-information-outline',
            'text-base',
          ]"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    default: () => [],
  },
  primaryAction: {
    type: Object,
    default: null,
  },
  secondaryAction: {
    type: Object,
    default: null,
  },
});

defineEmits(["primary-click", "secondary-click"]);
</script>
