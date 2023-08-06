import express from "express";
import controllers from "../controllers/variants";
const router = express.Router();

router.get("/", controllers.getVariants);
router.post("/", controllers.createVariant);
router.delete("/:id", controllers.deleteVariant);
router.put("/:id", controllers.updateVariant);

export = router;
