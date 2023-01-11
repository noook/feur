<template>
  <div class="p-4 space-y-4">
    <nav>
      <router-link class="text-sm" :to="{ name: 'home' }">🏠 Home</router-link>
    </nav>
    <h1 class="text-3xl">Signaler un feur</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div class="flex flex-col gap-2">
        <label for="context">Contexte:</label>
        <textarea
          v-model="context"
          name="context"
          class="border rounded p-2"
          id="context"
          rows="10"
          placeholder="Voulez-vous donner du contexte à ce feur ?" />
      </div>
      <div class="flex justify-center">
        <button
          :disabled="isSubmitting"
          class="h-8 px-4 bg-blue-400 disabled:bg-gray-200 text-white rounded"
          type="submit">
          <Loader color="bg-gray-400" v-if="isSubmitting" />
          <span v-else>Soumettre</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCurrentUser, useFirestore } from 'vuefire';
import {
  addDoc, collection, doc, serverTimestamp,
} from 'firebase/firestore';
import Loader from '@/components/Loader.vue';

const router = useRouter();

const context = ref('');

const db = useFirestore();
const currentUser = await getCurrentUser();

const isSubmitting = ref(false);

async function onSubmit() {
  isSubmitting.value = true;

  await addDoc(
    collection(db, 'feurs'),
    {
      context: context.value,
      timestamp: serverTimestamp(),
      reporter: doc(collection(db, 'users'), currentUser?.uid),
    },
  );
  router.push({ name: 'home' });
}
</script>
