import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

// ✅ Add a Journal Entry
router.post("/add", async (req, res) => {
  try {
    const { userId, date, mood, content } = req.body;
    const journalRef = db.collection("journals").doc(userId).collection("entries");
    await journalRef.add({ date, mood, content });

    res.status(200).json({ message: "Journal entry added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Journal Entries
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection("journals").doc(userId).collection("entries").get();
    const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;



// // ✅ Delete a Journal Entry
// router.delete("/delete/:userId/:journalId", async (req, res) => {
//   try {
//     const { userId, journalId } = req.params;

//     const journalRef = db.collection("journals").doc(userId).collection("entries").doc(journalId);
//     await journalRef.delete();

//     res.status(200).json({ message: "Journal deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// import express from "express";
// import { db } from "../firebase.js";

// const router = express.Router();

// // ✅ Add a Journal Entry
// router.post("/add", async (req, res) => {
//   try {
//     const { userId, date, mood, content } = req.body;
//     const journalRef = db.collection("journals").doc(userId).collection("entries");
//     await journalRef.add({ date, mood, content });

//     res.status(200).json({ message: "Journal entry added successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Get All Journal Entries
// router.get("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const snapshot = await db.collection("journals").doc(userId).collection("entries").get();
//     const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//     res.status(200).json(entries);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;
