import { auth, db } from "./firebase-init.js";
import { doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

function requireUser() {
  const user = auth.currentUser;
  if (!user) throw new Error("尚未登入");
  return user;
}

export async function smokeWrite() {
  const user = requireUser();
  const ref = doc(db, "users", user.uid, "sync", "meta");
  await setDoc(ref, {
    schemaVersion: 1,
    updatedAt: serverTimestamp(),
    updatedBy: user.email || "",
    testValue: "hello-firestore"
  }, { merge: true });
  return true;
}

export async function smokeRead() {
  const user = requireUser();
  const ref = doc(db, "users", user.uid, "sync", "meta");
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
