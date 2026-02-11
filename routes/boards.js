import express from "express";
import Board from "../models/Board.js";
import GET from "../Contollers/boards/GET.js";
import detail from "../Contollers/boards/detail.js";
import create from "../Contollers/boards/create.js";
import patch from "../Contollers/boards/patch.js";


const router = express.Router();

router.options("/", (req, res) => {
    res.set("Allow", "GET,POST,OPTIONS");
    res.sendStatus(204);
});

// GET /boards
router.get("/", GET);

router.options("/:id", (req, res) => {
    res.set("Allow","GET,OPTIONS, PATCH, PUT,DELETE");
    res.sendStatus(204);
});

// GET detail
router.get("/:id", detail);


// POST /boards (CREATE of SEED)
router.post("/", create);

// PATCH /boards/:id (partial update)
router.patch("/:id", patch);



// PUT /boards/:id
router.put("/:id", async (req, res) => {
    try {
        const updated = await Board.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Board not found" });
        }

        return res.json(updated);
    } catch (e) {
        return res.status(400).json({ message: "Update failed", error: e.message });
    }
});


// DELETE /boards/:id
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Board.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Board not found" });
        }

        // netjes: geen body bij delete
        return res.sendStatus(204);
    } catch (e) {
        return res.status(400).json({ message: "Invalid id", error: e.message });
    }
});

export default router;
