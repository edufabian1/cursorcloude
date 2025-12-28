# 🔧 Solución: Error de Ejecución de Scripts en PowerShell

## ❌ Error que estás viendo:

```
npm : No se puede cargar el archivo C:\Program Files\nodejs\npm.ps1 porque la ejecución de scripts está deshabilitada en este sistema.
```

## ✅ Soluciones

### Opción 1: Cambiar la Política de Ejecución (Recomendado)

**Abre PowerShell como Administrador:**

1. Presiona `Win + X`
2. Selecciona **"Windows PowerShell (Administrador)"** o **"Terminal (Administrador)"**
3. Ejecuta este comando:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

4. Cuando te pregunte, escribe `Y` y presiona Enter
5. Verifica que funcionó:
```powershell
Get-ExecutionPolicy
```
Debería mostrar: `RemoteSigned`

**Ahora cierra y vuelve a abrir tu terminal de VS Code.**

---

### Opción 2: Usar CMD en lugar de PowerShell

En VS Code:
1. Abre la paleta de comandos: `Ctrl + Shift + P`
2. Escribe: `Terminal: Select Default Profile`
3. Selecciona **"Command Prompt"** en lugar de PowerShell
4. Abre una nueva terminal

---

### Opción 3: Cambiar solo para el Usuario Actual (Sin Administrador)

Abre PowerShell normal (no como administrador) y ejecuta:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### Opción 4: Usar npm.cmd directamente

En lugar de `npm`, usa `npm.cmd`:

```bash
npm.cmd --version
npm.cmd install
npm.cmd run dev
```

---

## 🔍 Verificar la Política Actual

Para ver qué política tienes configurada:

```powershell
Get-ExecutionPolicy -List
```

Esto mostrará las políticas para:
- `MachinePolicy`` - Política del sistema
- `UserPolicy` - Política del usuario
- `Process` - Política del proceso actual
- `CurrentUser` - Política del usuario actual
- `LocalMachine` - Política de la máquina local

---

## 📝 Explicación de las Políticas

- **Restricted**: No permite ejecutar ningún script (por defecto en algunos sistemas)
- **RemoteSigned**: Permite scripts locales sin firma, pero scripts descargados deben estar firmados (recomendado)
- **Unrestricted**: Permite todos los scripts (menos seguro)
- **Bypass**: No hay restricciones (solo para procesos específicos)

**Recomendación:** Usa `RemoteSigned` para el scope `CurrentUser`

---

## ✅ Verificar que Funcionó

Después de cambiar la política, verifica:

```bash
npm --version
node --version
```

Ambos deberían funcionar sin errores.

---

## 🆘 Si Aún No Funciona

1. **Cierra completamente VS Code**
2. **Abre VS Code de nuevo**
3. **Abre una nueva terminal** (no el Debug Terminal)
4. Prueba de nuevo: `npm --version`

Si el problema persiste, usa CMD en lugar de PowerShell (Opción 2).

