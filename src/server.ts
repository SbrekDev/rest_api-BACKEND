import express from "express"
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import router from "./routes"
import db from "./config/db";
import swaggerSpec, {swaggerUiOptions} from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from 'morgan'


// conectar a db
async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.bgGreen.white('conexion exitosa a la db'));
        
    } catch (error) {
        console.log(error);
        console.log(colors.bgRed.white('error al conectar db'));
        
        
    }
}

connectDB()

const server = express()

// perimtir conexiones cors
const corsOptions : CorsOptions = {
    origin: function (origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
            
        }
        
    }
}

server.use(cors(corsOptions))

// leer datos de forms
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

// docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server