// Importa il modulo Router da Express per gestire le route
const { Router } = require("express");

// Importa i controller necessari per gestire le richieste relative ai commenti
const {
  getComments,
  getCommentsByPostId,
  saveComment,
  updateComment,
  deleteComment,
} = require("../controllers/CommentControllers");

// Crea un'istanza di Router di Express
const router = Router();

// Definisci le route utilizzando il metodo corrispondente del router e associa ciascuna a una funzione del controller
router
  .get("/blogPosts/:id/comments", getComments) // Route per ottenere tutti i commenti in base all'id di un post specifico
  .get("/blogPosts/:id/comments/:commentId", getCommentsByPostId) // Route per ottenere un commento specifico relativo a un post specifico
  .post("/blogPosts/:id", saveComment) // Route per salvare un nuovo commento
  .put("/blogPosts/:id/comments/:commentId", updateComment) // Route per aggiornare un commento esistente in base all'ID
  .delete("/blogPosts/:id/comments/:commentId", deleteComment); // Route per eliminare un commento esistente in base all'ID

// Esporta il router per renderlo disponibile ad altri moduli
module.exports = router;
