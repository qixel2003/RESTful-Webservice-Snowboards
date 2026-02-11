import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        imageURL: { type: String, required: false,
            default:"https://www.duijvestein-winterstore.nl/thumbnail/f5/32/45/1755687022/bcdb3dcac683bc306e64ac94290ada08_800x800.jpg?ts=1755687029" },
        type: { type: String, required: true, trim: true },
        bookmark: { type: Boolean, required: true, default: false },
        experience: {
            type: String, required: true,
            enum: ["beginner", "intermediate", "advanced", "expert",],
            default: "intermediate",
        },
        shape: {
            type: String, required: true,
            enum: ["true-twin", "directional", "directional-twin", "asymmetrical", "tapered-directional", "volume-shifted"],
            default: "directional-twin",
        },
        flex: {
            type: String, required: true,
            enum: ["soft", "medium-soft", "medium", "medium-stiff", "stiff"],
            default: "medium",
        },
        dateAdded: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: (doc, ret) => {
                ret.id = ret._id.toString();

                ret._links = {
                    self: {
                        href: `${process.env.APPLICATION_URL}:${process.env.EXPRESS_PORT}/boards/${ret.id}`,
                    },
                    collection: {
                        href: `${process.env.APPLICATION_URL}:${process.env.EXPRESS_PORT}/boards`,
                    },
                };

                delete ret._id;
                return ret;
            },
        },
    }
);

const Board = mongoose.model("Board", boardSchema);

export default Board;
