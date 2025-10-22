# Instrucciones para Configurar Firebase - MenStyle360

## Problema Identificado
El error de permisos al registrar usuarios se debe a que las reglas de seguridad de Firestore no están configuradas correctamente.

## Solución Paso a Paso

### 1. Configurar Reglas de Firestore

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `project-abel-2cc44`
3. En el menú lateral, haz clic en **Firestore Database**
4. Ve a la pestaña **Rules**
5. Reemplaza las reglas actuales con las siguientes:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reglas para la colección de usuarios
    match /users/{userId} {
      // Permitir lectura y escritura solo al usuario propietario
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Permitir creación de nuevos usuarios (para el registro)
      allow create: if request.auth != null && request.auth.uid == userId;
    }
    
    // Reglas para rutinas de usuario
    match /userRoutines/{routineId} {
      // Solo el usuario propietario puede leer y escribir sus rutinas
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
      
      // Permitir creación de nuevas rutinas
      allow create: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
    }
    
    // Reglas para favoritos de usuario
    match /userFavorites/{favoriteId} {
      // Solo el usuario propietario puede leer y escribir sus favoritos
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
      
      // Permitir creación de nuevos favoritos
      allow create: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
    }
    
    // Reglas para datos públicos (si los hay)
    match /public/{document=**} {
      // Permitir lectura a todos los usuarios autenticados
      allow read: if request.auth != null;
    }
  }
}
```

6. Haz clic en **Publish** para guardar las reglas

### 2. Verificar Configuración de Autenticación

1. En Firebase Console, ve a **Authentication**
2. Ve a la pestaña **Sign-in method**
3. Asegúrate de que **Email/Password** esté habilitado
4. Si no está habilitado, haz clic en **Email/Password** y actívalo

### 3. Verificar Configuración del Proyecto

1. Ve a **Project Settings** (ícono de engranaje)
2. En la pestaña **General**, verifica que:
   - El **Project ID** sea: `project-abel-2cc44`
   - El **Web API Key** sea: `AIzaSyAbZgio_PqHn58tOpUJ10ySghJaQnjRbOI`

### 4. Probar el Registro

1. Abre `login.html` en tu navegador
2. Ve a la pestaña **Registrarse**
3. Completa el formulario con datos de prueba
4. Haz clic en **Crear Cuenta**

### 5. Verificar en Firestore

1. En Firebase Console, ve a **Firestore Database**
2. Ve a la pestaña **Data**
3. Deberías ver una colección llamada **users** con el nuevo usuario
4. También deberías ver una colección **userRoutines** con la rutina por defecto

## Solución de Problemas

### Si sigues teniendo errores de permisos:

1. **Verifica las reglas**: Asegúrate de que las reglas se guardaron correctamente
2. **Espera unos minutos**: Los cambios en las reglas pueden tardar en aplicarse
3. **Limpia la caché**: Refresca la página con Ctrl+F5
4. **Verifica la consola**: Abre las herramientas de desarrollador para ver errores específicos

### Si el usuario se crea pero no se guarda en Firestore:

1. Verifica que Firestore esté habilitado en tu proyecto
2. Asegúrate de que las reglas permitan la escritura
3. Revisa la consola del navegador para errores específicos

## Archivos Modificados

- `auth-script.js`: Mejorado el manejo de errores
- `firestore-setup.js`: Mejorado el manejo de errores de permisos
- `firestore-rules.txt`: Reglas de seguridad correctas

## Notas Importantes

- Las reglas de Firestore son la causa más común de errores de permisos
- Siempre prueba en modo incógnito después de hacer cambios
- Los errores de permisos pueden tardar unos minutos en resolverse
- Si necesitas ayuda, revisa los logs en la consola del navegador
