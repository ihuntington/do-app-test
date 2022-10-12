import { FastifyInstance } from "fastify";

interface IPostBody {
    title: string;
    content: string;
    authorEmail: string;
}

export async function routes(fastify: FastifyInstance) {
    fastify.get("/", async () => {
        return { hello: "world" }
    })

    fastify.get("/users", async () => {
        const users = await fastify.prisma.user.findMany();
        return users;
    });

    fastify.get("/feed", async (req) => {
        const posts = await fastify.prisma.post.findMany({
            where: {
                published: true,
            },
            include: {
                author: true,
            }
        })

        return posts;
    })

    fastify.post<{
        Body: IPostBody
    }>("/post", async (req) => {
        const { title, content, authorEmail } = req.body;
        const post = await fastify.prisma.post.create({
            data: {
                title,
                content,
                published: false,
                author: {
                    connect: {
                        email: authorEmail
                    }
                }
            }
        })

        return post;
    })
}