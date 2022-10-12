import Fastify from "fastify";
import { prismaPlugin } from "./plugins";
import { routes } from "./routes";

const fastify = Fastify({
    logger: true,
})

fastify.register(prismaPlugin)
fastify.register(routes)

async function start() {
    try {
        await fastify.listen({
            host: "0.0.0.0",
            port: 8080,
        })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
