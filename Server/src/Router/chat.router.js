import Router from 'express'
import {verifyJWT} from '../Middlewares/auth.middleware.js'
import { accessChat, fetchChat, fetchMessagesOfChat, sendMessage } from '../Controllers/chat.controller.js'

const router = Router()

router.route("/createChat").post(verifyJWT, accessChat);
router.route("/fetchchats").get(verifyJWT, fetchChat);
router.route("/:chatId/sendMessage").post(verifyJWT, sendMessage);
router.route("/:chatId/getMessages").get(verifyJWT, fetchMessagesOfChat)

export default router