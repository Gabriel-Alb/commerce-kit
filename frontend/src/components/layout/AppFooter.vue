<template>
  <footer :class="footerClass">
    <div :class="containerClass">
      <div>
        <a
          :href="brand.href"
          class="flex items-center gap-3"
          :aria-label="brand.ariaLabel || `${brand.title} - footer`"
        >
          <div :class="brandBadgeClass">
            <span :class="brandShortClass">
              {{ brand.short }}
            </span>
          </div>

          <div class="leading-tight">
            <p :class="brandTitleClass">
              {{ brand.title }}
            </p>
            <p :class="brandSubtitleClass">
              {{ brand.subtitle }}
            </p>
          </div>
        </a>

        <p v-if="description" :class="descriptionClass">
          {{ description }}
        </p>
      </div>

      <div
        v-for="(section, sectionIndex) in sections"
        :key="section.title ?? sectionIndex"
      >
        <h3 :class="sectionTitleClass">
          {{ section.title }}
        </h3>

        <ul :class="sectionListClass">
          <li
            v-for="(link, linkIndex) in section.links"
            :key="`${section.title}-${link.label}-${linkIndex}`"
          >
            <a
              :href="link.href || '#'"
              :target="link.target"
              :rel="
                link.rel ||
                (link.target === '_blank' ? 'noopener noreferrer' : undefined)
              "
              :class="linkClass"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div :class="bottomBorderClass">
      <div :class="bottomContainerClass">
        <p>{{ copyright }}</p>

        <div
          v-if="socialLinks.length"
          class="flex flex-wrap items-center gap-3"
        >
          <template
            v-for="(social, index) in socialLinks"
            :key="`${social.label}-${index}`"
          >
            <span v-if="index > 0" :class="separatorClass" aria-hidden="true">
              {{ socialSeparator }}
            </span>

            <a
              :href="social.href || '#'"
              :target="social.target"
              :rel="
                social.rel ||
                (social.target === '_blank' ? 'noopener noreferrer' : undefined)
              "
              :class="linkClass"
            >
              {{ social.label }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  brand: {
    type: Object,
    required: true,
    validator(value) {
      return ["short", "title", "subtitle"].every((key) => key in value);
    },
  },

  description: {
    type: String,
    default: "",
  },

  sections: {
    type: Array,
    default: () => [],
  },

  copyright: {
    type: String,
    default: "© 2026. All rights reserved.",
  },

  socialLinks: {
    type: Array,
    default: () => [],
  },

  socialSeparator: {
    type: String,
    default: "•",
  },

  footerClass: {
    type: String,
    default: "border-t border-white/10 bg-black/30",
  },

  containerClass: {
    type: String,
    default:
      "mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8",
  },

  brandBadgeClass: {
    type: String,
    default:
      "grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 shadow-sm",
  },

  brandShortClass: {
    type: String,
    default: "text-sm font-bold tracking-tight text-violet-300",
  },

  brandTitleClass: {
    type: String,
    default: "text-sm font-semibold tracking-tight text-white",
  },

  brandSubtitleClass: {
    type: String,
    default: "text-[11px] text-slate-400",
  },

  descriptionClass: {
    type: String,
    default: "mt-4 text-sm leading-6 text-slate-400",
  },

  sectionTitleClass: {
    type: String,
    default: "text-sm font-semibold text-white",
  },

  sectionListClass: {
    type: String,
    default: "mt-4 space-y-2 text-sm text-slate-400",
  },

  linkClass: {
    type: String,
    default: "transition hover:text-violet-300",
  },

  bottomBorderClass: {
    type: String,
    default: "border-t border-white/10",
  },

  bottomContainerClass: {
    type: String,
    default:
      "mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8",
  },

  separatorClass: {
    type: String,
    default: "",
  },
});

const normalizedBrand = computed(() => ({
  href: "#",
  ariaLabel: "",
  ...props.brand,
}));
</script>

<script>
export default {
  name: "AppFooter",
};
</script>
