<template>
  <section :id="sectionId" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="grid gap-6 lg:grid-cols-2">
      <FeatureMainCard
        :eyebrow="mainCard.eyebrow"
        :title="mainCard.title"
        :description="mainCard.description"
        :items="mainCard.items"
        :primary-action="mainCard.primaryAction"
        :secondary-action="mainCard.secondaryAction"
        @primary-click="$emit('primary-click', $event)"
        @secondary-click="$emit('secondary-click', $event)"
      />

      <div class="grid gap-4 sm:grid-cols-2">
        <FeatureInfoCard
          v-for="(card, index) in topCards"
          :key="card.id ?? index"
          :eyebrow="card.eyebrow"
          :title="card.title"
          :description="card.description"
          :variant="card.variant"
          :placeholder-class="card.placeholderClass"
        />

        <FeatureWideCard
          v-if="bottomCard"
          class="sm:col-span-2"
          :eyebrow="bottomCard.eyebrow"
          :title="bottomCard.title"
          :description="bottomCard.description"
          :action="bottomCard.action"
          @action-click="$emit('bottom-action-click', $event)"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import FeatureMainCard from "../ui/FeatureMainCard.vue"
import FeatureInfoCard from "../ui/FeatureInfoCard.vue";
import FeatureWideCard from "../ui/FeatureWideCard.vue";

defineProps({
  sectionId: {
    type: String,
    default: "new",
  },
  mainCard: {
    type: Object,
    required: true,
  },
  topCards: {
    type: Array,
    default: () => [],
  },
  bottomCard: {
    type: Object,
    default: null,
  },
});

defineEmits(["primary-click", "secondary-click", "bottom-action-click"]);
</script>
