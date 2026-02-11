import Board from "../../models/Board.js";

export default async function getBoards(req, res) {
    try {
        const base = `${process.env.APPLICATION_URL}:${process.env.EXPRESS_PORT}`;

        const page = Math.max(parseInt(req.query.page ?? "1", 10), 1);
        const hasLimit = req.query.limit !== undefined;
        const limit = hasLimit ? Math.max(parseInt(req.query.limit, 10), 1) : null;

        const totalItems = await Board.countDocuments();

        const pageLimit = hasLimit ? limit : totalItems;
        const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / pageLimit);
        const safePage = Math.min(page, totalPages);

        const skip = (safePage - 1) * pageLimit;

        const boards = await Board.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageLimit);

        const items = boards.map((s) => ({
            id: s._id.toString(),
            name: s.name,
            description: s.description,
            price: s.price,
            imageURL: s.imageURL,
            _links: {
                self: { href: `${base}/boards/${s._id}` },
            },
        }));

        const makeHref = (p) => {
            if (!hasLimit) return `${base}/boards`;
            return `${base}/boards?page=${p}&limit=${pageLimit}`;
        };

        return res.json({
            items,
            _links: {
                self: { href: hasLimit ? makeHref(safePage) : `${base}/boards` },
                collection: { href: `${base}/boards` },
            },
            pagination: {
                currentPage: safePage,
                currentItems: items.length,
                totalPages: hasLimit ? totalPages : 1,
                totalItems,
                _links: {
                    first: { page: 1, href: makeHref(1) },
                    last: {
                        page: hasLimit ? totalPages : 1,
                        href: makeHref(hasLimit ? totalPages : 1),
                    },
                    previous: safePage > 1 ? { page: safePage - 1, href: makeHref(safePage - 1) } : null,
                    next:
                        safePage < (hasLimit ? totalPages : 1)
                            ? { page: safePage + 1, href: makeHref(safePage + 1) }
                            : null,
                },
            },
        });
    } catch (e) {
        return res.status(500).json({ message: "Failed to fetch boards", error: e.message });
    }
}
