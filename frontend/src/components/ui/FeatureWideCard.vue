<template>
  <div
    class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur"
  >
    <div
      class="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"
    >
      <div>
        <p class="text-xs uppercase tracking-[0.14em] text-slate-400">
          {{ eyebrow }}
        </p>

        <p class="mt-2 text-2xl font-semibold tracking-tight text-white">
          {{ title }}
        </p>

        <p class="mt-3 max-w-xl text-sm leading-6 text-slate-300">
          {{ description }}
        </p>
      </div>

      <button
        v-if="action"
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 shadow-sm transition hover:border-violet-300/20 hover:bg-violet-500/10 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
        @click="$emit('action-click', action)"
      >
        {{ action.label }}
        <span :class="[action.icon || 'mdi mdi-email-outline', 'text-base']" />
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
  action: {
    type: Object,
    default: null,
  },
});

defineEmits(["action-click"]);
</script>
