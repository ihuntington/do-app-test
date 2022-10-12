import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users: Prisma.UserCreateInput[] = [
    {
        email: "ian@example.org",
        name: "Ian H",
        posts: {
            create: [
                {
                    title: "Learning TS, Prisma, Docker",
                    content: "Messing around with TS & Prisma on a Wednesday",
                    published: true,
                }
            ]
        }
    },
    {
        email: "zoe@example.org",
        name: "Zoe S",
        posts: {
            create: [
                {
                    title: "An average Wednesday at work",
                    content: "Today in the NHS 10,000 biscuits were eaten",
                    published: true,
                }
            ]
        }
    },
];

async function main() {
    console.log("Start seeding...");
    for (const u of users) {
        const user = await prisma.user.create({
            data: u,
        });
        console.log(`Created user with ID: ${user.id}`);
    }
    console.log("Finished seeding")
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
