import mongoose from "mongoose";

const catEnum = [
  "Electrónica",
  "Moda y Accesorios",
  "Belleza y Cuidado Personal",
  "Hogar y Cocina",
  "Deportes",
  "Salud y Bienestar",
  "Automotriz",
  "Mascotas",
  "Alimentos y Bebidas",
  "Libros y Papelería",
];

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, enum: catEnum },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
