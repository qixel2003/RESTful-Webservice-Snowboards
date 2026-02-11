// import { faker } from "@faker-js/faker";
// import Board from "../models/Board.js";
//
// export default async function boardSeed(amount = 10) {
//     await Board.deleteMany({});
//
//     const shapes = [
//         "true-twin",
//         "directional",
//         "directional-twin",
//         "asymmetrical",
//         "tapered-directional",
//         "volume-shifted",
//     ];
//
//     const flexes = [
//         "soft",
//         "medium-soft",
//         "medium",
//         "medium-stiff",
//         "stiff",
//     ];
//
//     const types = ["all-mountain", "freestyle", "freeride", "powder", "park"];
//     const experiences = ["beginner", "intermediate", "advanced", "expert"];
//
//     const boards = [];
//
//     for (let i = 0; i < amount; i++) {
//         boards.push({
//             name: faker.commerce.productName(),
//             description: faker.commerce.productDescription(),
//             price: faker.number.int({ min: 300, max: 900 }),
//             imageURL: faker.image.urlLoremFlickr({ category: "snowboard" }),
//             type: faker.helpers.arrayElement(types),
//             experience: faker.helpers.arrayElement(experiences),
//             shape: faker.helpers.arrayElement(shapes),
//             flex: faker.helpers.arrayElement(flexes),
//             bookmark: false,
//         });
//     }
//
//     return Board.insertMany(boards);
// }
import Board from "../models/Board.js";

export default async function boardSeed(amount = 30) {
    await Board.deleteMany({});

    const image = "https://www.spacsport.nl/img/nidecker-score-snowboard-heren_1500x1500_58744.jpg";

    const boards = [
        { name: "Arctic Beast X", description: "High-speed all-mountain board with excellent edge hold and stability.", price: 599, imageURL: image, type: "all-mountain", experience: "advanced", shape: "directional-twin", flex: "medium-stiff", bookmark: false },
        { name: "Powder Phantom", description: "Floaty freeride board designed for deep snow and backcountry lines.", price: 749, imageURL: image, type: "powder", experience: "expert", shape: "tapered-directional", flex: "stiff", bookmark: false },
        { name: "Park Shredder", description: "Soft flex freestyle board perfect for rails, jumps, and presses.", price: 449, imageURL: image, type: "park", experience: "intermediate", shape: "true-twin", flex: "soft", bookmark: false },
        { name: "Summit Carver", description: "Precision carving machine built for groomers and high-speed turns.", price: 679, imageURL: image, type: "all-mountain", experience: "advanced", shape: "directional", flex: "stiff", bookmark: false },
        { name: "Urban Trickster", description: "Playful freestyle board with pop and forgiveness.", price: 499, imageURL: image, type: "freestyle", experience: "intermediate", shape: "true-twin", flex: "medium-soft", bookmark: false },
        { name: "Glacier Rider", description: "Stable freeride board for big mountain terrain.", price: 720, imageURL: image, type: "freeride", experience: "advanced", shape: "directional", flex: "stiff", bookmark: false },
        { name: "Snowstorm Lite", description: "Lightweight beginner-friendly all-mountain snowboard.", price: 399, imageURL: image, type: "all-mountain", experience: "beginner", shape: "directional-twin", flex: "medium-soft", bookmark: false },
        { name: "Frostbite Pro", description: "Aggressive board with explosive pop and responsiveness.", price: 799, imageURL: image, type: "freestyle", experience: "expert", shape: "true-twin", flex: "stiff", bookmark: false },
        { name: "Deep Drift", description: "Powder specialist with setback stance and wide nose.", price: 769, imageURL: image, type: "powder", experience: "advanced", shape: "tapered-directional", flex: "medium-stiff", bookmark: false },
        { name: "Ice Edge", description: "Hardpack and icy condition performance board.", price: 689, imageURL: image, type: "all-mountain", experience: "advanced", shape: "directional", flex: "stiff", bookmark: false },
        { name: "Gravity Play", description: "Fun and forgiving freestyle deck.", price: 459, imageURL: image, type: "freestyle", experience: "intermediate", shape: "true-twin", flex: "medium-soft", bookmark: false },
        { name: "Alpine Hunter", description: "Big mountain freeride board with directional power.", price: 780, imageURL: image, type: "freeride", experience: "expert", shape: "directional", flex: "stiff", bookmark: false },
        { name: "Cloud Cruiser", description: "Smooth all-mountain board for versatile riding.", price: 559, imageURL: image, type: "all-mountain", experience: "intermediate", shape: "directional-twin", flex: "medium", bookmark: false },
        { name: "Zero Gravity", description: "Lightweight park board with high ollie power.", price: 519, imageURL: image, type: "park", experience: "intermediate", shape: "true-twin", flex: "medium-soft", bookmark: false },
        { name: "White Wave", description: "Powder surf-style snowboard with wide profile.", price: 799, imageURL: image, type: "powder", experience: "advanced", shape: "volume-shifted", flex: "medium", bookmark: false },
        { name: "Icebreaker", description: "Grip and control on icy slopes.", price: 640, imageURL: image, type: "all-mountain", experience: "advanced", shape: "directional", flex: "stiff", bookmark: false },
        { name: "Slope Style", description: "Freestyle performance board.", price: 520, imageURL: image, type: "freestyle", experience: "intermediate", shape: "true-twin", flex: "medium", bookmark: false },
        { name: "Backcountry X", description: "Touring and freeride hybrid.", price: 820, imageURL: image, type: "freeride", experience: "expert", shape: "directional", flex: "stiff", bookmark: false },
        { name: "Glide Master", description: "Smooth carving ride.", price: 610, imageURL: image, type: "all-mountain", experience: "advanced", shape: "directional-twin", flex: "medium", bookmark: false },
        { name: "Pop Rocket", description: "Explosive park jumps.", price: 470, imageURL: image, type: "park", experience: "intermediate", shape: "true-twin", flex: "soft", bookmark: false },
        { name: "Snow Falcon", description: "Fast freeride board.", price: 730, imageURL: image, type: "freeride", experience: "advanced", shape: "directional", flex: "stiff", bookmark: false },
        { name: "Edge Rider", description: "Sharp edge hold board.", price: 660, imageURL: image, type: "all-mountain", experience: "advanced", shape: "directional", flex: "medium-stiff", bookmark: false },
        { name: "Pow Slayer", description: "Powder destroyer.", price: 810, imageURL: image, type: "powder", experience: "expert", shape: "tapered-directional", flex: "stiff", bookmark: false },
        { name: "Trick Buddy", description: "Beginner park board.", price: 420, imageURL: image, type: "park", experience: "beginner", shape: "true-twin", flex: "soft", bookmark: false },
        { name: "Summit Flow", description: "Balanced mountain ride.", price: 590, imageURL: image, type: "all-mountain", experience: "intermediate", shape: "directional-twin", flex: "medium", bookmark: false },
        { name: "Frost Flex", description: "Flexible freestyle board.", price: 480, imageURL: image, type: "freestyle", experience: "intermediate", shape: "true-twin", flex: "medium-soft", bookmark: false },
        { name: "Blizzard Pro", description: "High-speed carving tool.", price: 710, imageURL: image, type: "all-mountain", experience: "expert", shape: "directional", flex: "stiff", bookmark: false },
        { name: "White Peak", description: "Versatile freeride deck.", price: 695, imageURL: image, type: "freeride", experience: "advanced", shape: "directional", flex: "medium-stiff", bookmark: false },
        { name: "Air Time", description: "Big air freestyle board.", price: 530, imageURL: image, type: "freestyle", experience: "advanced", shape: "true-twin", flex: "medium", bookmark: false },
        { name: "Mountain Ghost", description: "Stealthy all-mountain performer.", price: 650, imageURL: image, type: "all-mountain", experience: "advanced", shape: "directional-twin", flex: "medium-stiff", bookmark: false },
    ];

    return Board.insertMany(boards.slice(0, amount));
}
