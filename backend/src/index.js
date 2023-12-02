import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import postagensRouter from './modules/postagens/route'
import categoriasRouter from './modules/categorias/route'
import autoresRouter from './modules/autores/route'
import imagensRouter from './modules/imagens/route'

// App
const app = express()

// Middlewares
app.use(bodyParser({ 'limit': '100mb' }))
app.use(cors())
app.use(morgan('dev'))

// Rotas
app.get('/healthcheck', (req, res) => {
  res.send('hello world')
})

app.use('/postagens', postagensRouter)
app.use('/categorias', categoriasRouter)
app.use('/autores', autoresRouter)
app.use('/imagens', imagensRouter)

app.get('*', (req, res) =>
    res.status(404).send('Nao encontrado')
)

// Inicio
app.listen(3001, () => {
    console.info('Project running on port 3001')
})
