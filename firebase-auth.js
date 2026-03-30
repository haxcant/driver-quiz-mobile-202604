import { auth, googleProvider } from "./firebase-init.js";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export async function loginWithGoogle() {
  if (isMobile()) {
    await signInWithRedirect(auth, googleProvider);
  } else {
    await signInWithPopup(auth, googleProvider);
  }
}

export async function finishRedirectLogin() {
  try {
    await getRedirectResult(auth);
  } catch (err) {
    console.error("Redirect login failed:", err);
  }
}

export async function logoutFirebase() {
  await signOut(auth);
}

export function watchAuthState(onChange) {
  return onAuthStateChanged(auth, (user) => {
    onChange(user);
  });
}