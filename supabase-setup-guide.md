# Guía para Configurar Supabase

## 🚀 Crear un nuevo proyecto de Supabase

### Paso 1: Crear cuenta y proyecto
1. Ve a [supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. Inicia sesión con GitHub, Google, o crea una cuenta
4. Haz clic en "New Project"
5. Completa la información:
   - **Name**: `stepable-app` (o el nombre que prefieras)
   - **Database Password**: Genera una contraseña segura
   - **Region**: Elige la región más cercana
6. Haz clic en "Create new project"

### Paso 2: Obtener las credenciales
1. Una vez creado el proyecto, ve a **Settings > API**
2. Copia los siguientes valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Paso 3: Actualizar el archivo .env.local
Reemplaza los valores en tu archivo `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

### Paso 4: Crear las tablas (opcional)
Si quieres usar la base de datos, ejecuta este SQL en el editor SQL de Supabase:

```sql
-- Tabla de usuarios (extendida)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  language TEXT DEFAULT 'es',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de proyectos
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  github_repo TEXT,
  project_type TEXT,
  status TEXT DEFAULT 'active',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de miembros de proyecto
CREATE TABLE IF NOT EXISTS project_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('owner', 'admin', 'member')) DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;

-- Políticas básicas
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view projects they're members of" ON projects FOR SELECT 
USING (id IN (SELECT project_id FROM project_members WHERE user_id = auth.uid()));

CREATE POLICY "Project owners can manage projects" ON projects FOR ALL 
USING (created_by = auth.uid());
```

## 🔧 Solución Temporal (Sin Base de Datos)

Si no quieres configurar Supabase ahora, puedes usar la aplicación en modo demo:

1. La aplicación funcionará para navegación
2. El login mostrará errores pero no bloqueará la UI
3. Puedes explorar todas las funcionalidades de la interfaz
