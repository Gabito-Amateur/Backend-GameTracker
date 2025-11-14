import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Juego", required: true },
  puntuacion: { type: Number, min: 1, max: 5, required: true },
  textoResena: { type: String, trim: true, requerid: true },
  horasJugadas: { type: Number, min: 0, required: true },
  dificultad: { type: String, enum: {
    values: ["Fácil", "Normal", "Difícil", "Muy Difícil"],
    message: "Dificultad no válida"
  }, required: true },
  recomendaria: { type: Boolean, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});

export default mongoose.model("Resena", resenaSchema);
