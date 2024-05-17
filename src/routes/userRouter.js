import { Router } from "express"
import userModel from "../dao/models/userModel.js"

const router = Router()

router.get('/api/users', async (req, res) => {
    try {
        let users = await userModel.find()
        res.send({ result: "success", payload: users })
    } catch (error) {
        console.log(error)
    }
})

router.post('/api/users', async (req, res) => {
    let { name, last_name, email } = req.body
    if (!name || !last_name || !email) {
        res.send({ status: "error", error: "Faltan datos" })
    }
    let result = await userModel.create({ name, last_name, email })
    res.send({ result: "success", payload: result })
})

router.put('/api/users/:uid', async (req, res) => {
    let { uid } = req.params

    let userToReplace = req.body

    if (!userToReplace.name || !userToReplace.last_name || !userToReplace.email) {
        res.send({ status: "error", error: "Datos no definidos" })
    }
    let result = await userModel.updateOne({ _id: uid }, userToReplace)

    res.send({ result: "success", payload: result })
})

router.delete('/api/users/:uid', async (req, res) => {
    let { uid } = req.params
    let result = await userModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })
})

export default router