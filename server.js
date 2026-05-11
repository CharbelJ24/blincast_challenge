import { fastify } from 'fastify'

const server = fastify({ logger: true })

const database = { /* nome: "", idade: "" */}

server.post('/document', (request, reply) => {
    const { action, key, value } = request.body

    if (action == 'create') {
        //  key ja existe
        if(database[key] !== undefined){
            return reply.status(409).send({ status: 'error', code: 6 })
        }
        
        // key nao existe 
        database[key] = value
        return reply.send({ status: 'ok', code: 0 })
    }

    // if (action == 'update') {

    // }

    // if (action == 'delete') {

    // }
})

server.listen({
    port: 3333,
})