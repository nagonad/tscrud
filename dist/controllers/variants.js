"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const getVariants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_1.pool.query("SELECT * FROM variants");
        const variants = response.rows;
        res.status(200).json({ data: variants });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
const createVariant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqBody = req.body;
        const { response } = yield db_1.pool.query(`INSERT INTO variants (variantname,price) VALUES ('${reqBody.variantname}',${reqBody.price}) RETURNING *`);
        const variant = response.rows;
        res.status(200).json({ data: variant });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
const deleteVariant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield db_1.pool.query(`DELETE FROM variants WHERE id=${id} RETURNING *`);
        const variant = response.rows;
        res.status(200).json({ data: variant });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
const updateVariant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const variantBody = req.body;
        const response = yield db_1.pool.query(`UPDATE variants SET variantname='${variantBody.variantname}', price=${variantBody.price} where id=${id} RETURNING *`);
        const variant = response.rows;
        res.status(200).json({ data: variant });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.default = { getVariants, createVariant, deleteVariant, updateVariant };
