import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

admin.initializeApp();

export const onSignIn = functions.https.onCall((data, context) => {
  if (!context.auth) {
    return;
  }

  const { name, email, picture } = context.auth.token;

  return getFirestore().doc(`users/${context.auth.uid}`).set({
    name,
    email,
    picture,
  });
});
