<script setup lang="ts">
import {
  collection, getCountFromServer, limit, orderBy, query,
} from 'firebase/firestore';
import { useCollection, useFirestore } from 'vuefire';
import { useTransition, TransitionPresets } from '@vueuse/core';
import { formatDateTime } from '@/utils';
import { ref, computed } from 'vue';

const total = ref(0);
const transitionedFeurs = useTransition(total, {
  duration: 1000,
  transition: TransitionPresets.easeOutCubic,
});
const totalFeurs = computed(() => Math.round(transitionedFeurs.value));

const feurs = useCollection(
  query(
    collection(useFirestore(), 'feurs'),
    orderBy('timestamp', 'desc'),
    limit(10),
  ),
);

getCountFromServer(collection(useFirestore(), 'feurs'))
  .then((response) => {
    total.value = response.data().count;
  });
</script>

<template>
  <main>
    <h1 class="text-4xl text-center font-medium py-4">Feur !</h1>
    <section class="flex flex-col items-center gap-y-2">
      <h2 class="text-lg">Nombre de feurs signalés pour Abel</h2>
      <strong class="text-3xl">{{ totalFeurs }}</strong>
    </section>
    <section class="flex justify-center my-8">
      <router-link
        :to="{ name: 'report' }"
        class="h-8 px-2 font-medium bg-blue-400 text-white rounded flex items-center">
        Signaler un feur
      </router-link>
    </section>
    <section class="p-4 space-y-2">
      <h2 class="text-2xl">Les 10 derniers feurs:</h2>
      <ul class="divide-y divide-gray-200">
        <li v-for="feur in feurs" :key="feur.id" class="py-4 text-sm">
          <div v-if="feur.context" class="mb-2">
            <span class="font-medium">Contexte:</span>
            <p>{{ feur.context }}</p>
          </div>
          <div class="flex items-center text-sm">
            <span>Signalé par {{ feur.reporter.name }}</span>
            <img class="ml-2 rounded-full w-6 h-6" :src="feur.reporter.picture" referrerPolicy="no-referrer" :alt="feur.reporter.name">
          </div>
          <div class="flex items-center text-sm">
            <time :datetime="new Date(feur.timestamp.seconds * 1000).toString()">
              🕓 {{ formatDateTime(new Date(feur.timestamp.seconds * 1000)) }}
            </time>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
