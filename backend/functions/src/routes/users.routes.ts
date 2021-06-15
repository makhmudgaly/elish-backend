import {Router} from "express";

const router: Router = Router();
router.get("/", (req, res) => {
  console.log("USERS GET");
  res.send("USERS GET");
});
router.post("/", (req, res) => {
  console.log("USERS POST");
  res.send("USERS POST");
});

export default router;
