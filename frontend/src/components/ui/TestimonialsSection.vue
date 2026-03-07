<template>
  <section id="reviews" class="bg-white/[0.02]">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mb-8">
        <p class="text-sm font-medium text-violet-300">
          {{ eyebrow }}
        </p>

        <h2
          class="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          {{ title }}
        </h2>
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <article
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur transition hover:border-violet-300/20 hover:bg-white/[0.07] hover:shadow-md"
        >
          <div class="mb-4 flex items-center gap-1 text-amber-400">
            <span
              v-for="i in 5"
              :key="i"
              class="mdi mdi-star text-base"
            />
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

              <p class="text-xs text-slate-400">
                {{ testimonial.role }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: "Reviews",
  },
  title: {
    type: String,
    default: "What customers say",
  },
  testimonials: {
    type: Array,
    required: true,
  },
});
</script>