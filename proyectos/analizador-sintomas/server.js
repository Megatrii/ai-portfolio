require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

module.exports = async (req, res) => {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { sintomas } = req.body;

  if (!sintomas || sintomas.trim() === '') {
    return res.status(400).json({ error: 'Por favor describe tus síntomas' });
  }

  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `Eres un asistente médico de orientación inicial, 
          responsable y cauteloso. Nunca das diagnósticos definitivos 
          ni recetas medicamentos.`
        },
        {
          role: 'user',
          content: `
            Analiza estos síntomas: ${sintomas}
            
            Responde exactamente así:
            POSIBLES CONDICIONES: (lista máximo 3)
            NIVEL DE URGENCIA: (URGENTE / PRONTO / PUEDE ESPERAR)
            ESPECIALISTA: (tipo de médico recomendado)
            ADVERTENCIA: Esto no reemplaza una consulta médica profesional.
          `
        }
      ]
    });

    res.status(200).json({ resultado: response.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ error: 'Error al consultar la IA: ' + error.message });
  }
};