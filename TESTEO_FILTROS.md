# 🎮 Guía de Testeo - Filtrado por Tienda

## ✅ Cómo probar el filtrado por tienda

### 1. **Abre el archivo `public/index.html` en tu navegador**
   - Doble clic en el archivo, o
   - Usa Live Server en VS Code

### 2. **Abre DevTools (F12) → Consola**
   - Aquí verás logs que confirman qué tienda está seleccionada y cuántos juegos se cargan

### 3. **Prueba el filtrado:**

#### **Paso 1: Carga inicial**
   - Al cargar la página verás:
     - `Tiendas cargadas: XX` (número de tiendas)
     - `Cargando ofertas iniciales desde Steam...`
     - `Se cargaron 20 juegos desde Steam`
   - El selector se llena con: Steam, Epic Games, GOG, Humble Bundle, etc.

#### **Paso 2: Cambiar de tienda**
   - **Haz clic en el selector "Todas las tiendas"**
   - Selecciona **"Epic Games"**
   - Verás en consola:
     ```
     Filtrando por tienda: 26
     Se encontraron XX juegos
     ```
   - **El grid se actualiza con juegos de Epic Games**

#### **Paso 3: Vuelve a cambiar**
   - Selecciona **"GOG"** (storeID: 5)
   - Verás:
     ```
     Filtrando por tienda: 5
     Se encontraron XX juegos
     ```
   - **El grid muestra juegos de GOG**

#### **Paso 4: Selecciona "Todas las tiendas"**
   - Verás:
     ```
     Filtrando por tienda: Todas las tiendas
     Se encontraron XX juegos
     ```
   - **Muestra ofertas de TODAS las tiendas combinadas**

#### **Paso 5: Prueba "Ver más" con filtro activo**
   - Selecciona una tienda (ej: Steam)
   - Haz clic en **"➕ Ver más"**
   - Verás en consola:
     ```
     Cargando más de la tienda: 1, página: 1
     Se encontraron 20 juegos adicionales
     ```
   - **Se cargan más juegos de Steam (página 2)**

#### **Paso 6: Combina búsqueda + filtro**
   - Selecciona una tienda (ej: Epic Games)
   - Busca un juego (ej: "Fortnite")
   - Verás resultados de Fortnite SOLO en Epic Games

## 🔍 **Tiendas disponibles (storeID)**
```
1  = Steam
26 = Epic Games
5  = GOG
13 = Humble Bundle
6  = Greenmangaming
14 = Uplay
Y más...
```

## ⚠️ **Si NO ves el filtrado funcionando:**

1. **Abre la Consola (F12)** y busca errores en rojo
2. **Verifica que la conexión a internet funciona** (la API es externa)
3. **Intenta recargar la página** (Ctrl + F5)
4. **Si aún así no funciona, revisa la Consola:**
   - Copia y pega aquí cualquier mensaje de error

## 📝 **Resumen de lo que ya está implementado:**

✅ **Cargar tiendas automáticamente** desde `/stores`  
✅ **Poblar selector con tiendas reales**  
✅ **Filtrar juegos al seleccionar tienda**  
✅ **Mantener filtro al hacer "Ver más"**  
✅ **Combinar búsqueda + filtro por tienda**  
✅ **Logs en consola para debugging**  

¡A testear! 🚀
