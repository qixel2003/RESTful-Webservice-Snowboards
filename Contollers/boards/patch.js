import Board from "../../models/Board.js";

export default async function patch(req, res) {
    try {
        const schemaPaths = Object.keys(Board.schema.paths);

        // veld blocked
        const blocked = new Set(["_id", "id", "__v", "createdAt", "updatedAt"]);

        const allowed = new Set(schemaPaths.filter((p) => !blocked.has(p)));

        // Filter req.body naar alleen toegestane velden
        const updates = {};
        for (const [key, value] of Object.entries(req.body || {})) {
            if (allowed.has(key)) {
                updates[key] = value;
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for PATCH",
                allowedFields: Array.from(allowed),
            });
        }

        const updated = await Board.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Board not found" });
        }

        return res.json(updated);
    } catch (e) {
        return res.status(400).json({ message: "Patch failed", error: e.message });
    }
}
