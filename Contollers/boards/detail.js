import Board from "../../models/Board.js";
import router from "../../routes/boards.js";

export default async function detail(req, res) {
    try {
        const item = await Board.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Board not found" });
        }

        res.json(item);
    } catch (e) {
        res.status(400).json({ message: "Invalid id", error: e.message });
    }
}