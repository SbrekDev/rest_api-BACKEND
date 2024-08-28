import  request  from "supertest";
import server from "../../server";

describe('POST /api/products', ()=>{

    it('should display validation errors', async ()=>{
        
        const response = await request(server).post('/api/products').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(200)
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)

    })

    it('should validate that the price is greater than 0', async ()=>{
        
        const response = await request(server).post('/api/products').send({
            name: 'PC',
            price : 0,
            availability : true
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)

    })

    it('should validate that the price is a number and greather than 0', async ()=>{
        
        const response = await request(server).post('/api/products').send({
            name: 'PC',
            price : 'hola',
            availability : true
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(200)
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)

    })


    it('should create a new product', async ()=>{
        
        const response = await request(server).post('/api/products').send({
            name : "PC -test",
            price : "1500",
            availability : true
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products', ()=>{

    it('should check if api/products url exists', async ()=> {
        const res = await request(server).get('/api/products')
        expect(res.status).not.toBe(404)
    })

    it('GET a JSON res with products', async ()=>{
        const res = await request(server).get('/api/products')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveLength(1)

        expect(res.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', ()=>{
    it('should return a 404 res for a non exist product', async () => {
        const productId = 5000
        const res = await request(server).get(`/api/products/${productId}`)

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('Producto no encontrado')
    })

    it('should check a valid id in the url', async () => {
        const res = await request(server).get('/api/products/not-valid-url')
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('ID no válido')

    })

    it('get a JSON response for a single product', async () => {
        const res = await request(server).get('/api/products/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')


    })
})

describe('PUT /api/products/:id', ()=>{

    it('should check a valid id in the url', async () => {
        const res = await request(server).put('/api/products/not-valid-url').send({
            name : "PC",
            price : 200,
            availability : true
    })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('ID no válido')


    })


    it('should check if exists id in the url', async () => {
        const productId = 5000
        const res = await request(server).put(`/api/products/${productId}`).send({
            name : "PC",
            price : 200,
            availability : true
    })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('error')

        expect(res.status).not.toBe(200)


    })


    it('should display validation error messages when updating a product', async () => {
        const res = await request(server).put('/api/products/1').send({})

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors).toHaveLength(5)

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it('should validate that the price is greater than 0', async () => {
        const res = await request(server).put('/api/products/1').send({
            name : "PC",
            price : 0,
            availability : true
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors).toHaveLength(1)

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it('should return a 404 res for a non existent product', async () => {
        const productId = 5000
        const res = await request(server).put(`/api/products/${productId}`).send({
            name : "PC",
            price : 0,
            availability : true
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it('should updating an existent product with valid data', async () => {
        const res = await request(server).put(`/api/products/1`).send({
            name : "PC",
            price : 300,
            availability : true
        })

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty('errors')
    })



})

describe('DELETE /api/products/:id', ()=>{
    it('should check a valid id in the url', async () => {
        const res = await request(server).delete('/api/products/not-valid-url')

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('ID no válido')

    })

    it('should return a 404 return for a non existent product', async () => {
        const productId = 5000
        const res = await request(server).delete(`/api/products/${productId}`)
        
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('Producto no encontrado')

        expect(res.status).not.toBe(200)

    })

    it('should delete a product', async () => {
        const res = await request(server).delete(`/api/products/1`)
        
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(400)

    })
})