# Página en blanco (React + CSS)

Una sola página muy simple. Solo React y CSS.

---

## Cómo ver la página

1. Abre la terminal en esta carpeta.

2. Primera vez: instala lo necesario.
   ```powershell
   npm install
   ```

3. Arranca el servidor.
   ```powershell
   npm run dev
   ```

4. Abre en el navegador la dirección que salga (ej: http://localhost:5173).

---

## Cómo cambiar el contenido (textos)

Abre **`src/App.jsx`**.

- **Título de la página** → cambia el texto entre `<h1>` y `</h1>`.
- **Párrafo** → cambia el texto entre `<p>` y `</p>`.
- **Añadir más texto** → copia una línea `<p>Tu texto aquí.</p>` y pégala donde quieras.

Ejemplo:
```jsx
<h1>Bienvenido a mi web</h1>
<p>Este es el primer párrafo.</p>
<p>Este es el segundo párrafo.</p>
```

---

## Cómo añadir más imágenes al carrusel (BounceCards)

Abre **`src/App.jsx`** y haz dos cosas:

1. **Importar la imagen** (arriba del todo, con los otros imports). Ejemplo:
   ```js
   import miFoto from './styles/Img/miFoto.jpg'
   ```
   (Pon la ruta donde tengas la imagen; si está en `src/styles/Img/`, usa esa ruta.)

2. **Añadirla a la lista** `carouselImages`. Ejemplo:
   ```js
   const carouselImages = [arbol, paletas, image, hojas, miFoto]
   ```

No hace falta tocar las posiciones: se calculan solas según el número de imágenes.

Para cambiar el **tamaño de las cartas**, edita en **`src/components/BounceCards.css`** la variable `--bounce-card-size` (ahora está en `280px`).

---

## Cómo cambiar los colores o el espacio

- **Colores de toda la página** (fondo y texto): abre **`src/styles/index.css`** y cambia `--color-fondo` y `--color-texto`.
- **Espacio y tamaño del contenido**: abre **`src/styles/App.css`** y ajusta `padding` o `max-width` dentro de `.pagina`.

---

## Resumen de archivos

| Archivo | Para qué sirve |
|---------|----------------|
| `src/App.jsx` | Aquí está tu página. Aquí cambias títulos y textos. |
| `src/styles/index.css` | Colores y estilo general de toda la página. |
| `src/styles/App.css` | Estilos del contenido (espacios, tamaño del título, etc.). |
| `src/main.jsx` | Entrada de la app. No suele tocarse. |

Solo necesitas tocar **App.jsx** (textos) y, si quieres, **index.css** y **App.css** (estilos).
