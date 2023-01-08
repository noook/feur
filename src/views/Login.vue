<template>
  <div class="flex items-center justify-center h-screen">
    <GoogleButton @click="performLogin" />
  </div>
</template>

<script setup lang="ts">
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import GoogleButton from '@/components/GoogleButton.vue';

const provider = new GoogleAuthProvider();

const auth = getAuth();

function performLogin() {
  signInWithPopup(auth, provider)
    .then(() => {
      const functions = getFunctions();
      const onSignIn = httpsCallable(functions, 'onSignIn');
      return onSignIn();
    });
}
</script>
