import { fastify } from 'fastify'
import { DatabaseMemory } from './database.js'

const server = fastify()

const database = new DatabaseMemory()

server.get('/document', (request, reply) => {
    const result = database.list()
    return reply.send(result)
})

server.post('/document', (request, reply) => {
    const { action, key, value } = request.body

    if (action == 'create') {
        const result = database.create(key, value)
        return reply.status(result.code === 0 ? 200: 409).send(result)
    }

    if (action == 'update') {
        const result = database.update(key, value)
        return reply.status(result.code === 0 ? 200: 404).send(result)
    }

    // if (action == 'delete') {

    // }
})

server.listen({
    port: 3333,
})