import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

export { db };


//BELOW
// import admin from "firebase-admin";
// import { getFirestore } from "firebase-admin/firestore";
// import dotenv from "dotenv";

// dotenv.config();

// const serviceAccount = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
//   universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
// };


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = getFirestore();

// export { db };
//ABOVE
// const db = admin.firestore();
// module.exports = { db };



// import admin from "firebase-admin";
// import { getFirestore } from "firebase-admin/firestore";
// import dotenv from "dotenv";

// dotenv.config();

// // ✅ Securely Load Firebase Admin Credentials from .env
// const serviceAccount = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // ✅ Fix private key format
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
// };

// // ✅ Initialize Firebase Admin
// try {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
//   console.log("🔥 Firebase Admin Initialized Successfully!");
// } catch (error) {
//   console.error("❌ Firebase Admin Initialization Failed:", error);
// }

// const db = getFirestore();

// export { db };



// import admin from "firebase-admin";
// import { getFirestore } from "firebase-admin/firestore";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from .env file

// // 🔥 Load Firebase Admin credentials manually from .env
// const serviceAccount = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY,  // ✅ No replace needed
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = getFirestore();
// export { db };


// import admin from "firebase-admin";
// import { getFirestore } from "firebase-admin/firestore";
// import dotenv from "dotenv";

// dotenv.config();

// // 🔥 Load Firebase Admin credentials
// const serviceAccount = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // ✅ Fix multiline key
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = getFirestore();

// export { db };// ✅ No more `addDoc`, `collection`, etc.



// import admin from "firebase-admin";
// import { getFirestore } from "firebase-admin/firestore";
// import dotenv from "dotenv";

// dotenv.config();

// // ✅ Securely Load Firebase Admin Credentials from .env
// const serviceAccount = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // ✅ Fix private key format
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
// };

// // ✅ Initialize Firebase Admin
// try {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
//   console.log("🔥 Firebase Admin Initialized Successfully!");
// } catch (error) {
//   console.error("❌ Firebase Admin Initialization Failed:", error);
// }

// const db = getFirestore();

// export { db };



// import admin from "firebase-admin";
// import { getFirestore } from "firebase-admin/firestore";

// import dotenv from "dotenv";

// dotenv.config();

// // 🔥 Load Firebase Admin credentials
// const serviceAccount = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // ✅ Fix for private key
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = getFirestore();

// export { db };









