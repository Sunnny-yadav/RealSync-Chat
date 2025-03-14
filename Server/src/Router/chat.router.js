import Router from 'express'
import {verifyJWT} from '../Middlewares/auth.middleware.js'
import { accessChat, fetchChat } from '../Controllers/chat.controller.js'

const router = Router()

router.route("/createChat").post(verifyJWT, accessChat)
router.route("/fetchchats").get(verifyJWT, fetchChat)

export default router