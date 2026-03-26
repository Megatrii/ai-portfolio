// Carga las variables de entorno desde .env
require('dotenv').config({ path: '../../.env' });

// Importa la librería de Groq
const Groq = require('groq-sdk');

// Conecta con tu API key
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Función principal que analiza síntomas
async function analizarSintomas(sintomas) {

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

  return response.choices[0].message.content;
}

// Prueba con síntomas de ejemplo
analizarSintomas('dolor de cabeza fuerte, fiebre de 39 grados, rigidez en el cuello')
  .then(resultado => {
    console.log('=== ANÁLISIS DE SÍNTOMAS ===');
    console.log(resultado);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
