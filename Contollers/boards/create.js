import requireAuth from "../../middleware/auth.js";
import boardseed from "../../seeder/boardseed.js";
import Board from "../../models/Board.js";
// import router from "../../routes/boards.js";

export default async function create(req, res) {
    try {
        const overloadMethod = req.body?.method;

        // SEED
        if (overloadMethod === "SEED") {
            await new Promise((resolve, reject) =>
                requireAuth(req, res, (err) => (err ? reject(err) : resolve()))
            );

            const amount = Number(req.body.amount) || 10;
            const created = await boardseed(amount);

            return res.status(201).json({
                message: `Seeded ${created.length} boards`,
                count: created.length,
                items: created,
            });
        }

        // CREATE
        const created = await Board.create(req.body);
        return res.status(201).json(created);
    } catch (e) {
        return res.status(400).json({ message: "POST failed", error: e.message });
    }
}