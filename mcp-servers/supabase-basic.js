#!/usr/bin/env node

/**
 * Servidor MCP básico para Supabase
 * Versión simplificada y compatible
 */

import { createClient } from '@supabase/supabase-js';

// Configuración hardcodeada
const SUPABASE_URL = 'https://cldwxejwgcsbiysujzwu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZHd4ZWp3Z2NzYml5c3Vqend1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NjE5NDcsImV4cCI6MjA3MzMzNzk0N30.qZCPdEWn1prgfu-BTKweh7cbOY1iM18aH11vHZ225xs';

// Crear cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para probar conexión
async function testConnection() {
  try {
    console.error('🔍 Probando conexión con Supabase...');
    
    // Probar conexión básica usando auth (que siempre está disponible)
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      // Si hay error de auth, probar con una consulta simple
      const { data: testData, error: testError } = await supabase
        .from('auth.users')
        .select('count')
        .limit(1);
      
      if (testError && !testError.message.includes('permission denied')) {
        throw new Error(`Error de conexión: ${testError.message}`);
      }
    }

    console.error('✅ Conexión con Supabase exitosa');
    console.error(`🌐 URL: ${SUPABASE_URL}`);
    console.error(`🔑 API Key: ${SUPABASE_ANON_KEY.substring(0, 20)}...`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error de conexión: ${error.message}`);
    return false;
  }
}

// Función para obtener información del usuario
async function getUserInfo() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }

    if (user) {
      console.error(`👤 Usuario: ${user.email}`);
      console.error(`🆔 ID: ${user.id}`);
    } else {
      console.error('❌ No hay usuario autenticado');
    }
    
    return user;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

// Función para consultar datos
async function queryData(table, operation = 'select', data = null, filters = null) {
  try {
    let result;
    
    switch (operation) {
      case 'select':
        let query = supabase.from(table).select('*');
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }
        result = await query;
        break;
        
      case 'insert':
        result = await supabase.from(table).insert(data);
        break;
        
      case 'update':
        let updateQuery = supabase.from(table).update(data);
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            updateQuery = updateQuery.eq(key, value);
          });
        }
        result = await updateQuery;
        break;
        
      case 'delete':
        let deleteQuery = supabase.from(table).delete();
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            deleteQuery = deleteQuery.eq(key, value);
          });
        }
        result = await deleteQuery;
        break;
        
      default:
        throw new Error(`Operación no soportada: ${operation}`);
    }

    if (result.error) {
      throw new Error(`Error de Supabase: ${result.error.message}`);
    }

    console.error(`✅ Operación ${operation} exitosa en tabla ${table}`);
    console.error(JSON.stringify(result.data, null, 2));
    
    return result.data;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

// Función principal
async function main() {
  console.error('🚀 Servidor MCP de Supabase iniciado');
  
  // Probar conexión
  const connected = await testConnection();
  
  if (!connected) {
    console.error('❌ No se pudo conectar a Supabase');
    process.exit(1);
  }
  
  // Obtener información del usuario
  await getUserInfo();
  
  // Mantener el servidor corriendo
  console.error('📡 Servidor MCP listo para recibir comandos');
  
  // Escuchar comandos desde stdin
  process.stdin.on('data', async (data) => {
    try {
      const command = data.toString().trim();
      
      if (command === 'test') {
        await testConnection();
      } else if (command === 'user') {
        await getUserInfo();
      } else if (command.startsWith('query ')) {
        const parts = command.split(' ');
        if (parts.length >= 2) {
          await queryData(parts[1]);
        }
      } else if (command === 'exit') {
        console.error('👋 Cerrando servidor MCP');
        process.exit(0);
      } else {
        console.error('❓ Comandos disponibles: test, user, query <table>, exit');
      }
    } catch (error) {
      console.error(`❌ Error procesando comando: ${error.message}`);
    }
  });
}

// Manejar señales de terminación
process.on('SIGINT', () => {
  console.error('\n🛑 Deteniendo servidor MCP...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('\n🛑 Deteniendo servidor MCP...');
  process.exit(0);
});

// Iniciar servidor
main().catch((error) => {
  console.error('❌ Error al iniciar servidor MCP:', error);
  process.exit(1);
});
