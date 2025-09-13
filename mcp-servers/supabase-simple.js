#!/usr/bin/env node

/**
 * Servidor MCP simplificado para Supabase
 * Versión más robusta y compatible
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createClient } from '@supabase/supabase-js';

// Configuración hardcodeada para evitar problemas de variables de entorno
const SUPABASE_URL = 'https://cldwxejwgcsbiysujzwu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZHd4ZWp3Z2NzYml5c3Vqend1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NjE5NDcsImV4cCI6MjA3MzMzNzk0N30.qZCPdEWn1prgfu-BTKweh7cbOY1iM18aH11vHZ225xs';

// Crear cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Crear servidor MCP
const server = new Server(
  {
    name: 'supabase-simple',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Herramienta para consultar datos de Supabase
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'query_supabase',
        description: 'Ejecutar consultas en la base de datos Supabase',
        inputSchema: {
          type: 'object',
          properties: {
            table: {
              type: 'string',
              description: 'Nombre de la tabla a consultar',
            },
            operation: {
              type: 'string',
              enum: ['select', 'insert', 'update', 'delete'],
              description: 'Operación a realizar',
            },
            data: {
              type: 'object',
              description: 'Datos para insertar/actualizar',
            },
            filters: {
              type: 'object',
              description: 'Filtros para la consulta',
            },
          },
          required: ['table', 'operation'],
        },
      },
      {
        name: 'get_user_info',
        description: 'Obtener información del usuario autenticado',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'test_connection',
        description: 'Probar la conexión con Supabase',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

// Manejar llamadas a herramientas
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'query_supabase':
        return await handleSupabaseQuery(args);
      case 'get_user_info':
        return await handleGetUserInfo();
      case 'test_connection':
        return await handleTestConnection();
      default:
        throw new Error(`Herramienta desconocida: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `❌ Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

async function handleSupabaseQuery(args) {
  const { table, operation, data, filters } = args;
  
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

  return {
    content: [
      {
        type: 'text',
        text: `✅ Operación ${operation} exitosa en tabla ${table}:\n${JSON.stringify(result.data, null, 2)}`,
      },
    ],
  };
}

async function handleGetUserInfo() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    throw new Error(`Error al obtener usuario: ${error.message}`);
  }

  return {
    content: [
      {
        type: 'text',
        text: user ? `👤 Usuario: ${user.email}\n🆔 ID: ${user.id}` : '❌ No hay usuario autenticado',
      },
    ],
  };
}

async function handleTestConnection() {
  try {
    // Probar conexión básica
    const { data, error } = await supabase.from('_test').select('*').limit(1);
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = tabla no existe (normal)
      throw new Error(`Error de conexión: ${error.message}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: `✅ Conexión con Supabase exitosa\n🌐 URL: ${SUPABASE_URL}\n🔑 API Key: ${SUPABASE_ANON_KEY.substring(0, 20)}...`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `❌ Error de conexión: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}

// Iniciar servidor
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('🚀 Servidor MCP de Supabase iniciado correctamente');
  } catch (error) {
    console.error('❌ Error al iniciar servidor MCP:', error);
    process.exit(1);
  }
}

main();

