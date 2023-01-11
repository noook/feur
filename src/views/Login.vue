<template>
  <div class="flex items-center justify-center h-screen">
    <div v-if="isSigninIn || isLoading" class="flex flex-col items-center gap-4">
      <p v-if="isSigninIn">Connexion en cours</p>
      <div class="flex gap-x-1">
        <div class="w-2.5 h-2.5 rounded-full bg-slate-800 animate-bounce " />
        <div class="w-2.5 h-2.5 rounded-full bg-slate-800 animate-bounce animation-delay-200" />
        <div class="w-2.5 h-2.5 rounded-full bg-slate-800 animate-bounce animation-delay-400" />
      </div>
    </div>
    <GoogleButton v-else @click="performLogin" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect,
} from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import GoogleButton from '@/components/GoogleButton.vue';

const router = useRouter();

function performLogin() {
  signInWithRedirect(getAuth(), new GoogleAuthProvider());
}

const isLoading = ref(true);
const isSigninIn = ref(false);

async function init() {
  const result = await getRedirectResult(getAuth());
  isLoading.value = false;

  if (result?.operationType === 'signIn') {
    isSigninIn.value = true;
    const functions = getFunctions();
    const onSignIn = httpsCallable(functions, 'onSignIn');
    await onSignIn();
    router.replace({ name: 'report' });
  }
}

init();

</script>
