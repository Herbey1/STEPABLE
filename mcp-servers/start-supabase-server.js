#!/usr/bin/env node

/**
 * Script de inicio para el servidor MCP de Supabase
 * Maneja las variables de entorno y la configuración
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://cldwxejwgcsbiysujzwu.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZHd4ZWp3Z2NzYml5c3Vqend1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NjE5NDcsImV4cCI6MjA3MzMzNzk0N30.qZCPdEWn1prgfu-BTKweh7cbOY1iM18aH11vHZ225xs';

// Verificar que las variables estén configuradas
if (!SUPABASE_ANON_KEY) {
  console.error('❌ SUPABASE_ANON_KEY no está configurada');
  process.exit(1);
}

// Configurar variables de entorno
const env = {
  ...process.env,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  NODE_ENV: 'development'
};

// Ruta al servidor principal
const serverPath = join(__dirname, 'supabase-server.js');

// Iniciar el servidor
const server = spawn('node', [serverPath], {
  env,
  stdio: 'inherit',
  cwd: __dirname
});

server.on('error', (error) => {
  console.error('❌ Error al iniciar servidor MCP:', error);
  process.exit(1);
});

server.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Servidor MCP terminó con código: ${code}`);
    process.exit(code);
  }
});

// Manejar señales de terminación
process.on('SIGINT', () => {
  console.log('\n🛑 Deteniendo servidor MCP...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Deteniendo servidor MCP...');
  server.kill('SIGTERM');
});

