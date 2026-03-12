<template>
  <section :class="sectionClass">
    <div :class="containerClass">
      <div class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p class="text-sm font-medium text-violet-300">
            {{ eyebrow }}
          </p>

          <h2
            class="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            {{ title }}
          </h2>

          <p
            class="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base"
          >
            {{ description }}
          </p>
        </div>

        <form class="space-y-3" @submit.prevent="onSubmit">
          <div class="flex flex-col gap-3 sm:flex-row">
            <label :for="inputId" class="sr-only">
              {{ inputLabel }}
            </label>

            <input
              :id="inputId"
              v-model="email"
              type="email"
              :placeholder="placeholder"
              class="h-12 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-violet-300/30 focus:ring-2 focus:ring-violet-400/20"
              required
            />

            <button
              type="submit"
              class="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 text-sm font-medium text-white transition hover:from-violet-400 hover:to-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
            >
              {{ buttonLabel }}
              <span :class="buttonIcon" class="text-base" />
            </button>
          </div>

          <p class="text-xs leading-5 text-slate-400">
            {{ disclaimer }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  eyebrow: {
    type: String,
    default: "Newsletter",
  },
  title: {
    type: String,
    default: "Get updates and member-only offers.",
  },
  description: {
    type: String,
    default:
      "Subscribe for new releases, deal alerts, and curated product picks across audio, wearables, and workspace essentials.",
  },
  placeholder: {
    type: String,
    default: "Your email address",
  },
  buttonLabel: {
    type: String,
    default: "Subscribe",
  },
  buttonIcon: {
    type: String,
    default: "mdi mdi-arrow-right",
  },
  disclaimer: {
    type: String,
    default:
      "By subscribing, you agree to our privacy policy and promotional communications.",
  },
  inputLabel: {
    type: String,
    default: "Email",
  },
  inputId: {
    type: String,
    default: "newsletter-email",
  },
  sectionClass: {
    type: String,
    default: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
  },
  containerClass: {
    type: String,
    default:
      "rounded-3xl border border-violet-300/15 bg-gradient-to-br from-white/5 to-violet-500/10 p-6 shadow-sm backdrop-blur sm:p-8 lg:p-10",
  },
  clearOnSubmit: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["submit"]);

const email = ref("");

function onSubmit() {
  emit("submit", email.value);

  if (props.clearOnSubmit) {
    email.value = "";
  }
}
</script>