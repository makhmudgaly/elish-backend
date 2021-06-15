import {Router} from "express";

import users from "./users.routes";
import auth from "./auth.routes";

const router: Router = Router();

router.use("/users", users);
router.use("/auth", auth);

export default router;
