"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const variants_1 = __importDefault(require("../controllers/variants"));
const router = express_1.default.Router();
router.get("/", variants_1.default.getVariants);
router.post("/", variants_1.default.createVariant);
router.delete("/:id", variants_1.default.deleteVariant);
router.put("/:id", variants_1.default.updateVariant);
module.exports = router;
