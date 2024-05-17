import { Router } from 'express'
import messageModel from '../dao/models/messageModel.js'

const router = Router()

router.get('/chat', async (req, res) => {
    try {
        const messages = await messageModel.find().lean()
        res.render('chat', { messages })
    } catch (error) {
        console.error('Error al cargar los mensajes:', error)
        res.status(500).render('error', { message: 'Error al cargar el chat' })
    }
})

router.post('/chat', async (req, res) => {
    const { user, message } = req.body
    console.log(req.body)

    if (!message) {
    return res.status(400).send('Faltan parámetros')
    }

    let chating = await messageModel.create({ user, message})
    console.log(chating)
    res.redirect('/chat')
})

router.get('/chat/:chid', async (req, res) => {
    try {
        const { chid } = req.params
        await messageModel.findByIdAndDelete(chid)
        
        res.redirect('/chat')
    } catch (error) {
        console.error('Error al eliminar el producto:', error)
        res.status(500).render('error', { message: 'Error al eliminar el producto.' })
    }
})

export default router