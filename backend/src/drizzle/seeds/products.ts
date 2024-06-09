import { generateEmbedding } from "@/lib/embeddings";
import { db } from "../db";
import { InsertProduct, products } from "../schema";

const staticAuthorId = "845ef89f-4fb8-4a64-a805-5aebf8c7e3bd";

const productData: InsertProduct[] = [
    {
        title: "God of High School",
        description: "High schooler Jin Mo-Ri is a martial arts prodigy. His life changes when he's invited to a martial arts tournament called The God of High School, where participants fight using their borrowed power (charyeok). Along the way, he forms friendships and faces formidable opponents.",
        price: 20,
        authorId: staticAuthorId,
        categoryId: 3
    },
    {
        title: "Hardcore Leveling Warrior",
        description: "Hardcore Leveling Warrior is the strongest player in the MMORPG Lucid Adventure. However, due to a mysterious curse, he loses all his levels and power, becoming the weakest player. Determined to regain his former glory, he embarks on a journey filled with challenges and discoveries.",
        price: 22,
        authorId: staticAuthorId,
        categoryId: 3
    },
    {
        title: "Dice: The Cube That Changes Everything",
        description: "Dongtae is a high school student who is bullied by his classmates. One day, he encounters a mysterious dice that grants him the power to change his life. But with great power comes great consequences. Dongtae learns that every decision he makes using the dice comes with a price.",
        price: 18,
        authorId: staticAuthorId,
        categoryId: 3
    },
    {
        title: "Unordinary",
        description: "In a world where everyone possesses superpowers called 'abilities,' John is an ordinary high school student without any abilities. However, he keeps this fact hidden and tries to live a normal life. But when his secret is exposed, his life takes a drastic turn, and he becomes entangled in a web of secrets and conspiracies.",
        price: 19,
        authorId: staticAuthorId,
        categoryId: 3
    },
    {
        title: "Tower of God",
        description: "Bam, a young boy, enters the mysterious Tower, seeking his closest companion who left him. His goal is to reach the top of the Tower and find her. But as he climbs, he faces various challenges and meets new friends and enemies.",
        price: 18,
        authorId: staticAuthorId,
        categoryId: 3
    },
    {
        title: "The God of High School",
        description: "Mori Jin, a high school student and Taekwondo specialist, starts a journey to find strong opponents and become the God of High School. Along the way, he encounters various martial artists with unique abilities and uncovers the mysteries of the tournament.",
        price: 21,
        authorId: staticAuthorId,
        categoryId: 3
    },
    {
        title: "Noblesse",
        description: "Raizel, a noble vampire, awakens from a 820-year slumber and starts attending a high school, where he meets his loyal servant Frankenstein. Raizel soon learns about the modern world and faces various threats to protect his friends.",
        price: 15,
        authorId: staticAuthorId,
        categoryId: 3
    },
    {
        title: "Solo Leveling",
        description: "Follows the adventures Sung Jinwoo in a world that is constantly threatened by monsters and the evil forces. In his battles Sung transforms himself from weakest hunter of all mankind to one of the strongest hunters in existence.",
        price: 20,
        authorId: staticAuthorId,
        categoryId: 3
    },
    {
        title: "Tomb Raider King",
        description: "God’s Tombs started to appear around the world. Due to the relics within these tombs, many were able to wield these legendary power for themselves, while others became enslaved to these users. However, a Tomb Raider appears with the purpose of robbing these relics. The Tomb Raider King. “God damn it! Did that bastard already loot this place as well?!” What you own belongs to me. What I own belongs to me. This is the story of a revived Tomb Raider who will do whatever he can to claim all the tombs and relics for himself!",
        price: 20,
        authorId: staticAuthorId,
        categoryId: 3
    },
    {
        title: "The Breaker",
        description: "Shi-Woon Yi, a timid high school student, becomes involved with Chun-Woo Han, a powerful martial artist, and gets drawn into the dangerous world of Murim (hidden martial arts). As he trains under Chun-Woo Han, he learns about courage, determination, and the true meaning of strength.",
        price: 17,
        authorId: staticAuthorId,
        categoryId: 3
    }
];

const productSeed = async () => {
    try {
        console.log("Seeding product...");

        for (const product of productData) {
            const embedding = await generateEmbedding(product.description);
            product.embedding = embedding;
        }
        await db.insert(products).values(productData);
        console.log("Data seeded.")
    } catch(error) {
        console.log("Err", error);
    }
}

productSeed();