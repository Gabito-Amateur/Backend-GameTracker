import express from "express";
import {
  obtenerResenas,
  obtenerResenasPorJuego,
  crearResena,
  actualizarResena,
  eliminarResena,
} from "../controllers/resena.controller.js";

const router = express.Router();

router.get("/", obtenerResenas);
router.get("/juego/:juegoId", obtenerResenasPorJuego);
router.post("/", crearResena);
router.put("/:id", actualizarResena);
router.delete("/:id", eliminarResena);

export default router;
