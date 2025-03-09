import Router from "express"
import {upload} from "../Middlewares/multer.middleware.js"
import { getUsers, loginUser, register_user } from "../Controllers/user.controller.js"
import { verifyJWT } from "../Middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(upload.single("avatar"),register_user)
router.route("/login").post(loginUser)
router.route("/getUser").get(verifyJWT, getUsers)


export default router