# Calculadora UVA - Argentina

Aplicación web React para consultar el valor actualizado de la UVA (Unidad de Valor Adquisitivo) en Argentina.

## 🚀 Características

- Consulta del valor UVA en tiempo real
- Interfaz moderna y responsive
- Diseño con Tailwind CSS
- Integración con API de ArgentinaDatos.com

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm (viene incluido con Node.js)

## 💻 Instalación de Node.js y npm (Windows)

Si no tienes Node.js ni npm instalados, sigue estos pasos:

### Opción 1: Instalador oficial (Recomendado)

1. **Descarga Node.js:**
   - Visita: https://nodejs.org/
   - Descarga la versión **LTS** (Long Term Support) - recomendada para la mayoría de usuarios
   - Elige el instalador para Windows (`.msi`)

2. **Instala Node.js:**
   - Ejecuta el archivo descargado (ej: `node-v20.x.x-x64.msi`)
   - Sigue el asistente de instalación
   - Acepta los términos y condiciones
   - **Importante:** Asegúrate de marcar la opción "Add to PATH" si aparece
   - Completa la instalación

3. **Verifica la instalación:**
   - Abre PowerShell o CMD
   - Ejecuta los siguientes comandos para verificar:
   ```bash
   node --version
   npm --version
   ```
   - Deberías ver números de versión (ej: `v20.11.0` y `10.2.4`)

### Opción 2: Usando Chocolatey (si ya lo tienes instalado)

```bash
choco install nodejs
```

### Opción 3: Usando winget (Windows Package Manager)

```bash
winget install OpenJS.NodeJS.LTS
```

### ⚠️ Nota Importante

Después de instalar Node.js, **cierra y vuelve a abrir** tu terminal (PowerShell/CMD) para que los cambios en el PATH surtan efecto.

## 🛠️ Instalación del Proyecto

1. Navega al directorio del proyecto:
```bash
cd C:\Users\Edu\Documents\cursorcloude
```

2. Instala las dependencias:
```bash
npm install
```

Este comando descargará todas las dependencias necesarias (React, Vite, Tailwind, etc.)

## ▶️ Ejecución

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Construcción para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`

## 📦 Estructura del Proyecto

```
cursorcloude/
├── public/          # Archivos estáticos
├── src/
│   ├── components/  # Componentes React
│   │   └── UVACalculator.jsx
│   ├── styles/     # Estilos CSS
│   │   └── index.css
│   ├── App.jsx     # Componente principal
│   └── main.jsx     # Punto de entrada
├── index.html      # HTML principal
├── package.json    # Dependencias del proyecto
├── vite.config.js  # Configuración de Vite
└── tailwind.config.js # Configuración de Tailwind
```

## 🌐 Despliegue

### Opción 1: Vercel (Recomendado)
1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente el proyecto Vite
3. Deploy automático en cada push

### Opción 2: Netlify
1. Conecta tu repositorio de GitHub a Netlify
2. Configura el build command: `npm run build`
3. Configura el publish directory: `dist`

### Opción 3: GitHub Pages
1. Instala `gh-pages`: `npm install --save-dev gh-pages`
2. Agrega al `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```
3. Ejecuta: `npm run deploy`

## 🔧 Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utility-first
- **Lucide React** - Iconos
- **ArgentinaDatos API** - API para datos financieros

## 📝 Notas

- ✅ **Conectado a API real**: El proyecto está conectado a la API de ArgentinaDatos.com y obtiene datos en tiempo real
- El proxy configurado en `vite.config.js` permite evitar problemas de CORS durante el desarrollo
- En producción, la aplicación se conecta directamente a la API

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

