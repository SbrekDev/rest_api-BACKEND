import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API opeartions related to products'
            }
        ],
        info: {
            title: 'REST API node.js / express / typescript',
            version: '1.0.0',
            description: 'API docs for products'
        }
    },
    apis: ['./src/routes.ts']
}
const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link{
            content: url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.hubspot.es%2Fmarketing%2Flogos-creativos&psig=AOvVaw0ZCgT1JC2se56tzDGY2Bgh&ust=1724887163325000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLDKtsmnlogDFQAAAAAdAAAAABAR');
            height: 80px;
            width: auto;

        }
    `,
    customSiteTitle: 'Documentacion REST API Express / TS'
}
export default swaggerSpec
export{
    swaggerUiOptions
}