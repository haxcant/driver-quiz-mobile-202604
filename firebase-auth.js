import { auth, googleProvider } from "./firebase-init.js";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const REDIRECT_FLAG_KEY = "driver_quiz_firebase_redirect_pending_v1";

function isMobileLike() {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || "");
}

export async function loginWithGoogle() {
  try {
    if (isMobileLike()) {
      try { localStorage.setItem(REDIRECT_FLAG_KEY, "1"); } catch {}
      await signInWithRedirect(auth, googleProvider);
      return { mode: "redirect" };
    }
    await signInWithPopup(auth, googleProvider);
    try { localStorage.removeItem(REDIRECT_FLAG_KEY); } catch {}
    return { mode: "popup" };
  } catch (err) {
    const code = String(err?.code || "");
    if (code.includes("popup") || code.includes("blocked")) {
      try { localStorage.setItem(REDIRECT_FLAG_KEY, "1"); } catch {}
      await signInWithRedirect(auth, googleProvider);
      return { mode: "redirect-fallback" };
    }
    throw err;
  }
}

export async function finishRedirectLogin() {
  try {
    const result = await getRedirectResult(auth);
    try { localStorage.removeItem(REDIRECT_FLAG_KEY); } catch {}
    return result;
  } catch (err) {
    try { localStorage.removeItem(REDIRECT_FLAG_KEY); } catch {}
    throw err;
  }
}

export function hasPendingRedirectLogin() {
  try {
    return localStorage.getItem(REDIRECT_FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

export async function logoutFirebase() {
  await signOut(auth);
  try { localStorage.removeItem(REDIRECT_FLAG_KEY); } catch {}
}

export function watchAuthState(onChange) {
  return onAuthStateChanged(auth, (user) => onChange(user));
}
