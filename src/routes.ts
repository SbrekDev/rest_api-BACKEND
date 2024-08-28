import {Router} from "express"
import { createProduct, deleteProduct, getProducts, getProductsById, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

/**  
*@swagger
*components:
*   schemas:
*        Product:
*           type: object
*           properties: 
*               id:
*                   type: integer
*                   description: The Product ID
*                   example: 1
*               name:
*                   type: string
*                   description: The Product name
*                   example: monitor curvo
*               price:
*                   type: number
*                   description: The Product price
*                   example: 300
*               availability:
*                   type: boolean
*                   description: The Product availability
*                   example: true
*/ 




// routing
router.get('/', getProducts)


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: get a list of products
 *          tags: 
 *              - Products
 *          description: return a list of products
 *          responses: 
 *              200: 
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                            type: array
 *                            items:
 *                                 $ref: '#/components/schemas/Product'
 */


router.get('/:id', 
    // validacion
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductsById
)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: get a product by id
 *          tags: 
 *              - Products
 *          description: return a product based on its unique id
 *          parameters:
 *            - in: path
 *              name: id
 *              description: the id of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses: 
 *              200: 
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404: 
 *                  description: product not found
 *              400: 
 *                  description: bad request - invalid id
 * 
 * 
 */

router.post('/', 
    // validacion 
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede estar vacío'),

    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El nombre del producto no puede estar vacío')
        .custom(value => value > 0).withMessage('Valor no válido'),

    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: creates a new product
 *          tags: 
 *              - Products
 *          description: returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: 'Monitor curvo'
 *                          price:
 *                              type: string
 *                              example: 399
 *          responses: 
 *              201: 
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400: 
 *                  description: bad request - invalid input data
 * 
 * 
 */

router.put('/:id',  
    // validacion
param('id')
    .isInt()
    .withMessage('ID no válido'),
body('name')
    .notEmpty().withMessage('El nombre del producto no puede estar vacío'),

body('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El nombre del producto no puede estar vacío')
    .custom(value => value > 0).withMessage('Valor no válido'),
body('availability')
    .isBoolean()
    .withMessage('Valor para la disponibilidad no válido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: updates a product with user input
 *          tags: 
 *              - Products
 *          description: returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: the id of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: 'Monitor curvo'
 *                          price:
 *                              type: string
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *          responses: 
 *              200: 
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400: 
 *                  description: bad request - invalid input data or invalid id
 *              404: 
 *                  description: product not found
 * 
 * 
 */


router.delete('/:id',
param('id')
    .isInt()
    .withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: delete a product by a given id
 *          tags: 
 *              - Products
 *          description: returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: the id of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses: 
 *              200: 
 *                  description: succsessful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto eliminado'
 *              404: 
 *                  description: product not found
 *              400: 
 *                  description: bad request - invalid id
 * 
 * 
 */

export default router;