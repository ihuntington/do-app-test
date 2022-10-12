import Fastify from "fastify";

const fastify = Fastify({
    logger: true,
})

fastify.get("/", async () => {
    return { hello: "world" }
})

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
