// Carga las variables de entorno desde .env
require("dotenv").config({ path: "../../.env" });

// Importa las librerías necesarias
const express = require("express");
const Groq = require("groq-sdk");

// Crea el servidor web y el cliente de IA
const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Permite que el servidor entienda JSON y sirva archivos estáticos
app.use(express.json());
app.use(express.static("public"));

// Ruta que recibe los síntomas y consulta la IA
app.post("/analizar", async (req, res) => {
  // Extrae los síntomas del cuerpo de la petición
  const { sintomas } = req.body;

  // Validación básica — nunca confíes en lo que llega del usuario
  if (!sintomas || sintomas.trim() === "") {
    return res.status(400).json({ error: "Por favor describe tus síntomas" });
  }

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `Eres un asistente médico de orientación inicial, 
          responsable y cauteloso. Nunca das diagnósticos definitivos 
          ni recetas medicamentos.`,
        },
        {
          role: "user",
          content: `
            Analiza estos síntomas: ${sintomas}
            
            Responde exactamente así:
            POSIBLES CONDICIONES: (lista máximo 3)
            NIVEL DE URGENCIA: (URGENTE / PRONTO / PUEDE ESPERAR)
            ESPECIALISTA: (tipo de médico recomendado)
            ADVERTENCIA: Esto no reemplaza una consulta médica profesional.
          `,
        },
      ],
    });

    // Devuelve el resultado al navegador
    res.json({ resultado: response.choices[0].message.content });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al consultar la IA: " + error.message });
  }
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
