# Analizador de Síntomas con IA

## Problema que resuelve

Personas sin acceso inmediato a un médico necesitan
orientación inicial sobre sus síntomas para decidir
si requieren atención urgente o pueden esperar.

## Usuario

Adulto sin conocimientos médicos, en Colombia,
con acceso a internet desde el celular.

## Qué hace la aplicación

1. El usuario escribe sus síntomas en texto libre
2. La app analiza con IA y responde:
   - Posibles condiciones asociadas (máximo 3)
   - Nivel de urgencia: URGENTE / PRONTO / PUEDE ESPERAR
   - Tipo de especialista recomendado
   - Advertencia: esto no reemplaza consulta médica

## Qué NO hace

- No da diagnósticos definitivos
- No receta medicamentos
- No almacena datos del usuario

## Stack

- Backend: Node.js
- IA: API de Anthropic (Claude)
- Interfaz: HTML + CSS básico (sin frameworks)

## Criterios de éxito

- Responde en menos de 10 segundos
- La advertencia médica siempre visible
- Funciona desde el celular




