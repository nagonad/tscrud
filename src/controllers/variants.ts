import { Request, Response, NextFunction } from "express";
import { pool } from "../db";
import { error } from "console";

interface Variant {
  id?: number;
  variantname: string;
  price: number;
}

const getVariants = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await pool.query("SELECT * FROM variants");
    const variants: Variant[] = response.rows;
    res.status(200).json({ data: variants });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const createVariant = async (req: Request, res: Response) => {
  try {
    const reqBody: Variant = req.body;

    const { response } = await pool.query(
      `INSERT INTO variants (variantname,price) VALUES ('${reqBody.variantname}',${reqBody.price}) RETURNING *`
    );
    const variant: Variant = response.rows;
    res.status(200).json({ data: variant });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const deleteVariant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      `DELETE FROM variants WHERE id=${id} RETURNING *`
    );

    const variant: Variant = response.rows;
    res.status(200).json({ data: variant });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const updateVariant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const variantBody: Variant = req.body;
    const response = await pool.query(
      `UPDATE variants SET variantname='${variantBody.variantname}', price=${variantBody.price} where id=${id} RETURNING *`
    );
    const variant: Variant = response.rows;
    res.status(200).json({ data: variant });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export default { getVariants, createVariant, deleteVariant, updateVariant };
