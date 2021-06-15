import {Router} from "express";

const router: Router = Router();
router.post("/login", (req, res) => {
  res.send("LOGIN POST");
});

export default router;
