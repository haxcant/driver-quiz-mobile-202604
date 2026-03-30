import { auth, googleProvider } from "./firebase-init.js";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  browserLocalPersistence,
  setPersistence,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const REDIRECT_FLAG_KEY = "driver_quiz_firebase_redirect_pending_v2";

function isMobileLike() {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || "");
}

async function ensurePersistence() {
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (err) {
    console.warn("setPersistence failed", err);
  }
}

export async function loginWithGoogle() {
  await ensurePersistence();
  try {
    // Popup-first is more robust on GitHub Pages / non-Firebase Hosting.
    const cred = await signInWithPopup(auth, googleProvider);
    try { localStorage.removeItem(REDIRECT_FLAG_KEY); } catch {}
    return { mode: "popup", credential: cred };
  } catch (err) {
    const code = String(err?.code || "");
    const shouldFallback = code.includes("popup") || code.includes("blocked") || code.includes("cancelled") || code.includes("closed");
    if (shouldFallback) {
      try { localStorage.setItem(REDIRECT_FLAG_KEY, "1"); } catch {}
      await signInWithRedirect(auth, googleProvider);
      return { mode: "redirect-fallback" };
    }
    throw err;
  }
}

export async function finishRedirectLogin() {
  await ensurePersistence();
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
