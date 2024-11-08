<template>
  <v-text-field
    v-if="showSearchBar"
    v-model="searchQuery"
    append-icon="mdi-magnify"
    label="Rechercher..."
    solo-inverted
    hide-details
    class="mx-3"
  ></v-text-field>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const searchQuery = ref(props.modelValue);

watch(searchQuery, (newValue) => {
  emit("update:modelValue", newValue);
});

const route = useRoute();
const showSearchBar = computed(() => route.name !== "Home");
</script>

<style scoped>
.mx-3 {
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
