<template>
  <div class="about">
    <button type="button" @click="performLogin">Login</button>
    <router-link to="/">home</router-link>
  </div>
</template>

<script setup lang="ts">
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();

const auth = getAuth();

function performLogin() {
  signInWithPopup(auth, provider)
    .then(() => {
      const functions = getFunctions();
      const onSignIn = httpsCallable(functions, 'onSignIn');
      return onSignIn();
    // ...
    });
}
</script>
