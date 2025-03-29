// ESM
import Fastify from 'fastify'
import fastifyMysql from '@fastify/mysql'
import cors from '@fastify/cors'
import product from './route/products.js'

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyMysql, {
    host:'localhost',
    user: 'root',
    password: '',
    database: 'example',
    promise: true,
}).register(cors, {
    origin: true
})



fastify.register(product, {prefix:'/products'})
// // Declare a route
// fastify.get('/', (request, reply) => {
//   reply.send({ hello: 'world' })
// })

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  // Server is now listening on ${address}
})