const Schema = {
    response: {
        200: {
            data: {type : 'array'}
        }
    }
}
const createSchema = {
    body: {
        properties: {
            product_name: {type: 'string'},
            price: {type: 'number'},
            stock: {type: 'number'}
        }
    },
    response: {
        200: {
            status:{ type: "number" },
            message: { type: "string" },
        }
    }
}
const products = (fastify, opts) => {
    fastify.get('/', {schema: Schema}, async (request, reply) => {
        const [data] = await fastify.mysql.execute(`SELECT * FROM product ORDER BY price ASC`)
        return {data}
        // reply.send({ hello: 'world' })
    })

    fastify.post('/', {schema: createSchema}, async (request, reply) => {
        const product = request.body
        
        try {
            const [data] = await fastify.mysql.execute(`SELECT * FROM product WHERE product_name = ? `, [product.product_name])

            if (data.length === 0) {
                await fastify.mysql.execute('INSERT INTO product (product_name, price, stock) VALUES (?, ?, ?);', [product.product_name, product.price, product.stock])
                return [{
                    status: 200,
                    message: 'success'
                }] 
            } else {
                return [{
                    status: 201,
                    message: 'error'
                }]  
            }
          
        } catch (error) {
            return error
        }
    })
}

export default products