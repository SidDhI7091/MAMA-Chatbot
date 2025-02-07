import express from "express";
import cors from "cors";
import journalRoutes from "./routes/journalRoutes.js";
import { db } from "./firebase.js";
import bcrypt from "bcrypt"; // For password encryption

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/journal", journalRoutes);

// ✅ Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { userId, password } = req.body;
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(400).json({ error: "User not found." });
    }

    const userData = querySnapshot.docs[0].data();
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password." });
    }

    res.json({ message: "Login successful!", userId: userData.userId });
  } catch (error) {
    res.status(500).json({ error: "Login failed." });
  }
});


app.post("/api/journal/add", async (req, res) => {
  try {
    console.log("Received journal save request:", req.body); // 🔥 Debugging log
    const { userId, date, title, content } = req.body;

    if (!userId || !date || !title || !content) {
      return res.status(400).json({ error: "Missing fields in request" });
    }

    const docRef = await addDoc(collection(db, "journals"), {
      userId,
      date,
      title,
      content,
      createdAt: new Date(),
    });

// ✅ Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { name, userId, password, mobile, email, newbornAge, depressionReason, familyContact, emergencyContact } = req.body;

    const q = query(collection(db, "users"), where("userId", "==", userId));
    const existingUsers = await getDocs(q);
    if (!existingUsers.empty) {
      return res.status(400).json({ error: "User ID already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await addDoc(collection(db, "users"), {
      name, userId, password: hashedPassword, mobile, email, newbornAge, depressionReason, familyContact, emergencyContact, createdAt: new Date(),
    });

    res.json({ message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ error: "Signup failed." });
  }
});

    console.log("Journal saved with ID:", docRef.id); // 🔥 Log success
    res.json({ message: "Journal entry added successfully!", id: docRef.id });
  } catch (error) {
    console.error("Error saving journal:", error); // 🔥 Log error
    res.status(500).json({ error: "Failed to save journal" });
  }
});
// ✅ Get Journals for a User
app.get("/api/journal/:userId/:date", async (req, res) => {
  try {
    const { userId, date } = req.params;
    const q = query(collection(db, "journals"), where("userId", "==", userId), where("date", "==", date));
    const querySnapshot = await getDocs(q);
    const journals = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch journal." });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



//BELOW
// import express from "express";
// import cors from "cors";
// import journalRoutes from "./routes/journalRoutes.js";
// import { db } from "./firebase.js";
// import bcrypt from "bcrypt"; // For password encryption

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use("/api/journal", journalRoutes);

// app.post("/api/login", async (req, res) => {
//   try {
//     const { userId, password } = req.body;

//     // 🔍 Find user by userId
//     const q = query(collection(db, "users"), where("userId", "==", userId));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//       return res.status(400).json({ error: "User not found." });
//     }

//     const userData = querySnapshot.docs[0].data();
//     const isPasswordCorrect = await bcrypt.compare(password, userData.password);

//     if (!isPasswordCorrect) {
//       return res.status(400).json({ error: "Incorrect password." });
//     }

//     res.json({ message: "Login successful!", userId: userData.userId });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Login failed. Try again." });
//   }
// });

// app.post("/api/journal/add", async (req, res) => {
//   try {
//     console.log("Received journal save request:", req.body); // 🔥 Debugging log
//     const { userId, date, title, content } = req.body;

//     if (!userId || !date || !title || !content) {
//       return res.status(400).json({ error: "Missing fields in request" });
//     }

//     const docRef = await addDoc(collection(db, "journals"), {
//       userId,
//       date,
//       title,
//       content,
//       createdAt: new Date(),
//     });

//     app.post("/api/signup", async (req, res) => {
//       try {
//         const { name, userId, password, mobile, email, newbornAge, depressionReason, familyContact, emergencyContact } = req.body;
    
//         // 🔍 Check if the user ID already exists
//         const q = query(collection(db, "users"), where("userId", "==", userId));
//         const existingUsers = await getDocs(q);
    
//         if (!existingUsers.empty) {
//           return res.status(400).json({ error: "User ID already taken. Choose a different one." });
//         }
    
//         // 🔒 Hash password before storing
//         const hashedPassword = await bcrypt.hash(password, 10);
    
//         // ✅ Store new user in Firestore
//         await addDoc(collection(db, "users"), {
//           name,
//           userId,
//           password: hashedPassword, // 🔒 Store hashed password
//           mobile,
//           email,
//           newbornAge,
//           depressionReason,
//           familyContact,
//           emergencyContact,
//           createdAt: new Date(),
//         });
    
//         res.json({ message: "Signup successful!" });
//       } catch (error) {
//         console.error("Signup error:", error);
//         res.status(500).json({ error: "Signup failed. Try again." });
//       }
//     });

//     console.log("Journal saved with ID:", docRef.id); // 🔥 Log success
//     res.json({ message: "Journal entry added successfully!", id: docRef.id });
//   } catch (error) {
//     console.error("Error saving journal:", error); // 🔥 Log error
//     res.status(500).json({ error: "Failed to save journal" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//ABOVE


// // import express from "express";
// // import cors from "cors";

// // import journalRoutes from "./routes/journalRoutes.js"; 
// // import bcrypt from "bcrypt";
// // import { db } from "./firebase.js";

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // ✅ Signup Route
// // app.post("/api/signup", async (req, res) => {
// //   try {
// //     const { name, userId, password, mobile, email, newbornAge, depressionReason, familyContact, emergencyContact } = req.body;

// //     // 🔍 Check if user already exists
// //     const userRef = db.collection("users").doc(userId);
// //     const userDoc = await userRef.get();
// //     if (userDoc.exists) {
// //       return res.status(400).json({ error: "User ID already taken." });
// //     }

// //     // 🔒 Hash password before storing
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // ✅ Save user using `set()`
// //     await userRef.set({
// //       name,
// //       userId,
// //       password: hashedPassword,
// //       mobile,
// //       email,
// //       newbornAge,
// //       depressionReason,
// //       familyContact,
// //       emergencyContact,
// //       createdAt: new Date(),
// //     });

// //     console.log("✅ User signed up:", userId);
// //     res.json({ message: "Signup successful!" });

// //   } catch (error) {
// //     console.error("❌ Signup error:", error);
// //     res.status(500).json({ error: "Signup failed due to a server error." });
// //   }
// // });

// // // ✅ Login Route
// // app.post("/api/login", async (req, res) => {
// //   try {
// //     const { userId, password } = req.body;

// //     // 🔍 Find user in Firestore
// //     const userRef = db.collection("users").doc(userId);
// //     const userDoc = await userRef.get();

// //     if (!userDoc.exists) {
// //       return res.status(400).json({ error: "User not found." });
// //     }

// //     const userData = userDoc.data();
// //     const isPasswordCorrect = await bcrypt.compare(password, userData.password);

// //     if (!isPasswordCorrect) {
// //       return res.status(400).json({ error: "Incorrect password." });
// //     }

// //     console.log("✅ User logged in:", userId);
// //     res.json({ message: "Login successful!", userId });

// //   } catch (error) {
// //     console.error("❌ Login error:", error);
// //     res.status(500).json({ error: "Login failed due to a server error." });
// //   }
// // });

// // // ✅ Add Journal Entry
// // app.post("/api/journal/add", async (req, res) => {
// //   try {
// //     const { userId, date, title, content } = req.body;

// //     if (!userId || !date || !title || !content) {
// //       return res.status(400).json({ error: "All fields are required!" });
// //     }

// //     const journalRef = db.collection("journals").doc(); // Auto-generate ID
// //     await journalRef.set({
// //       userId,
// //       date,
// //       title,
// //       content,
// //       createdAt: new Date(),
// //     });

// //     console.log("✅ Journal saved for:", userId);
// //     res.json({ message: "Journal saved!" });

// //   } catch (error) {
// //     console.error("❌ Journal save error:", error);
// //     res.status(500).json({ error: "Failed to save journal." });
// //   }
// // });

// // // ✅ Get Journals for a User by Date
// // app.get("/api/journal/:userId/:date", async (req, res) => {
// //   try {
// //     const { userId, date } = req.params;

// //     const querySnapshot = await db
// //       .collection("journals")
// //       .where("userId", "==", userId)
// //       .where("date", "==", date)
// //       .get();

// //     const journals = querySnapshot.docs.map((doc) => ({
// //       id: doc.id,
// //       ...doc.data(),
// //     }));

// //     res.json(journals);
// //   } catch (error) {
// //     console.error("❌ Fetch journal error:", error);
// //     res.status(500).json({ error: "Failed to fetch journal entries." });
// //   }
// // });

// // app.put("/api/journal/edit/:journalId", async (req, res) => {
// //   try {
// //     const { journalId } = req.params;
// //     const { title, content } = req.body;

// //     if (!title.trim() || !content.trim()) {
// //       return res.status(400).json({ error: "Title and content cannot be empty!" });
// //     }

// //     const journalRef = db.collection("journals").doc(journalId);
// //     await journalRef.update({
// //       title,
// //       content,
// //       updatedAt: new Date(),
// //     });

// //     console.log("✅ Journal updated:", journalId);
// //     res.json({ message: "Journal updated successfully!" });
// //   } catch (error) {
// //     console.error("❌ Journal update error:", error);
// //     res.status(500).json({ error: "Failed to update journal." });
// //   }
// // });


// // app.listen(5000, () => {
// //   console.log("🚀 Server running on port 5000");
// // });



// import express from "express";
// import cors from "cors";
// import bcrypt from "bcrypt";
// import { db } from "./firebase.js";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Signup Route
// app.post("/api/signup", async (req, res) => {
//   try {
//     const { name, userId, password, mobile, email, newbornAge, depressionReason, familyContact, emergencyContact } = req.body;

//     // 🔍 Check if user already exists
//     const userRef = db.collection("users").doc(userId);
//     const userDoc = await userRef.get();
//     if (userDoc.exists) {
//       return res.status(400).json({ error: "User ID already taken." });
//     }

//     // 🔒 Hash password before storing
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // ✅ Save user using `set()`
//     await userRef.set({
//       name,
//       userId,
//       password: hashedPassword,
//       mobile,
//       email,
//       newbornAge,
//       depressionReason,
//       familyContact,
//       emergencyContact,
//       createdAt: new Date(),
//     });

//     console.log("✅ User signed up:", userId);
//     res.json({ message: "Signup successful!" });

//   } catch (error) {
//     console.error("❌ Signup error:", error);
//     res.status(500).json({ error: "Signup failed due to a server error." });
//   }
// });

// // ✅ Login Route
// app.post("/api/login", async (req, res) => {
//   try {
//     const { userId, password } = req.body;

//     // 🔍 Find user in Firestore
//     const userRef = db.collection("users").doc(userId);
//     const userDoc = await userRef.get();

//     if (!userDoc.exists) {
//       return res.status(400).json({ error: "User not found." });
//     }

//     const userData = userDoc.data();
//     const isPasswordCorrect = await bcrypt.compare(password, userData.password);

//     if (!isPasswordCorrect) {
//       return res.status(400).json({ error: "Incorrect password." });
//     }

//     console.log("✅ User logged in:", userId);
//     res.json({ message: "Login successful!", userId });

//   } catch (error) {
//     console.error("❌ Login error:", error);
//     res.status(500).json({ error: "Login failed due to a server error." });
//   }
// });

// // ✅ Add Journal Entry
// app.post("/api/journal/add", async (req, res) => {
//   try {
//     const { userId, date, title, content } = req.body;

//     if (!userId || !date || !title || !content) {
//       return res.status(400).json({ error: "All fields are required!" });
//     }

//     const journalRef = db.collection("journals").doc(); // Auto-generate ID
//     await journalRef.set({
//       userId,
//       date,
//       title,
//       content,
//       createdAt: new Date(),
//     });

//     console.log("✅ Journal saved for:", userId);
//     res.json({ message: "Journal saved!" });

//   } catch (error) {
//     console.error("❌ Journal save error:", error);
//     res.status(500).json({ error: "Failed to save journal." });
//   }
// });

// // ✅ Get Journals for a User by Date
// app.get("/api/journal/:userId/:date", async (req, res) => {
//   try {
//     const { userId, date } = req.params;

//     const querySnapshot = await db
//       .collection("journals")
//       .where("userId", "==", userId)
//       .where("date", "==", date)
//       .get();

//     const journals = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     res.json(journals);
//   } catch (error) {
//     console.error("❌ Fetch journal error:", error);
//     res.status(500).json({ error: "Failed to fetch journal entries." });
//   }
// });


// /////////////
// app.put("/api/journal/edit/:journalId", async (req, res) => {
//   try {
//     const { journalId } = req.params;
//     const { title, content } = req.body;

//     if (!title.trim() || !content.trim()) {
//       return res.status(400).json({ error: "Title and content cannot be empty!" });
//     }

//     const journalRef = db.collection("journals").doc(journalId);
//     await journalRef.update({
//       title,
//       content,
//       updatedAt: new Date(),
//     });

//     console.log("✅ Journal updated:", journalId);
//     res.json({ message: "Journal updated successfully!" });
//   } catch (error) {
//     console.error("❌ Journal update error:", error);
//     res.status(500).json({ error: "Failed to update journal." });
//   }
// });
// /////////

// app.listen(5000, () => {
//   console.log("🚀 Server running on port 5000");
// });




// // import express from "express";
// // import cors from "cors";
// // import bcrypt from "bcrypt";
// // import { db } from "./firebase.js"; // Firestore instance
// // //import { FieldValue } from "firebase-admin/firestore"; // Import FieldValue if needed



// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // ✅ Signup Route
// // app.post("/api/signup", async (req, res) => {
// //   try {
// //     const { name, userId, password, mobile, email, newbornAge, depressionReason, familyContact, emergencyContact } = req.body;

// //     const userRef = db.collection("users");
// //     const snapshot = await userRef.where("userId", "==", userId).get();
// //     if (!snapshot.empty) {
// //       return res.status(400).json({ error: "User ID already taken." });
// //     }
    
// //     if (!existingUsers.empty) {
// //       return res.status(400).json({ error: "User ID already taken." });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     await addDoc(collection(db, "users"), {
// //       name, userId, password: hashedPassword, mobile, email, newbornAge, depressionReason, familyContact, emergencyContact, createdAt: new Date(),
// //     });

// //     res.json({ message: "Signup successful!" });
// //   } catch (error) {
// //     res.status(500).json({ error: "Signup failed." });
// //   }
// // });

// // // ✅ Login Route
// // app.post("/api/login", async (req, res) => {
// //   try {
// //     const { userId, password } = req.body;
// //     const q = query(collection(db, "users"), where("userId", "==", userId));
// //     const querySnapshot = await getDocs(q);

// //     if (querySnapshot.empty) {
// //       return res.status(400).json({ error: "User not found." });
// //     }

// //     const userData = querySnapshot.docs[0].data();
// //     const isPasswordCorrect = await bcrypt.compare(password, userData.password);
// //     if (!isPasswordCorrect) {
// //       return res.status(400).json({ error: "Incorrect password." });
// //     }

// //     res.json({ message: "Login successful!", userId: userData.userId });
// //   } catch (error) {
// //     res.status(500).json({ error: "Login failed." });
// //   }
// // });

// // // ✅ Add Journal Entry
// // app.post("/api/journal/add", async (req, res) => {
// //   try {
// //     const { userId, date, title, content } = req.body;
// //     await addDoc(collection(db, "journals"), { userId, date, title, content, createdAt: new Date() });
// //     res.json({ message: "Journal saved!" });
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to save journal." });
// //   }
// // });

// // // ✅ Get Journals for a User
// // app.get("/api/journal/:userId/:date", async (req, res) => {
// //   try {
// //     const { userId, date } = req.params;
// //     const q = query(collection(db, "journals"), where("userId", "==", userId), where("date", "==", date));
// //     const querySnapshot = await getDocs(q);
// //     const journals = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

// //     res.json(journals);
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to fetch journal." });
// //   }
// // });

// // app.listen(5000, () => {
// //   console.log("🚀 Server running on port 5000");
// // });







// // import express from "express";
// // import cors from "cors";
// // import bcrypt from "bcrypt"
// // import journalRoutes from "./routes/journalRoutes.js";

// // const app = express();

// // app.use(express.json());
// // app.use(cors());

// // // API Routes
// // app.use("/api/journal", journalRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
