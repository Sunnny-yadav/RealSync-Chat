import Router from "express"
import {upload} from "../Middlewares/multer.middleware.js"
import { loginUser, register_user } from "../Controllers/user.controller.js"

const router = Router()

router.route("/register").post(upload.single("avatar"),register_user)
router.route("/login").post(loginUser)


export default router