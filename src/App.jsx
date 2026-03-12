import './styles/App.css'
import BounceCards from './components/BounceCards'
import ServiceCards from './components/ServiceCards'
// ========== IMÁGENES DEL CARRUSEL ==========
// Añade aquí un import por cada imagen nueva (ruta desde src/styles/Img o la carpeta que uses).
import arbol from './styles/Img/arbol.jpg'
import paletas from './styles/Img/paletas.jpg'
import image from './styles/Img/image.png'
import hojas from './styles/Img/hojas.jpg'
import hojita from './styles/Img/hojita.jpg'
import casado from './styles/Img/casado.jpeg'
import armonia from './styles/Img/armonia.jpg'
import soda from './styles/Img/soda.jpg'
/*
  ============================================
  CÓMO AÑADIR MÁS IMÁGENES AL CARRUSEL
  ============================================
  1. Guarda la imagen en la carpeta src/styles/Img/ (o en otra carpeta dentro de src).
  2. Arriba, añade una línea de import. Ejemplo:
       import miFoto from './styles/Img/miFoto.jpg'
  3. Abajo, en el array carouselImages, añade el nombre de la variable (ej: miFoto).
     Ejemplo: const carouselImages = [arbol, paletas, image, hojas, miFoto]

  No hace falta tocar transformStyles: se generan solas según cuántas imágenes haya.
*/

// Genera la posición/rotación de cada carta automáticamente (una por imagen).
function getTransformStyles(count) {
  const spacing = 110
  const maxAngle = 6
  return Array.from({ length: count }, (_, i) => {
    const center = (count - 1) / 2
    const offset = i - center
    const tx = Math.round(offset * spacing)
    const rot = Math.round(offset * -maxAngle)
    return `rotate(${rot}deg) translate(${tx}px)`
  })
}

// Lista de imágenes del carrusel. Para añadir más: import arriba y añade aquí.
const carouselImages = [arbol, paletas, image, hojas, hojita]
const carouselTransforms = getTransformStyles(carouselImages.length)

// Servicios de Armonía: cada uno tiene imagen, título y descripción. Edita aquí el texto.
const serviciosArmonia = [
  { imagen: casado, titulo: 'Alimentación saludable', descripcion: 'Menús balanceados y de calidad.' },
  { imagen: armonia, titulo: 'Nutrición escolar', descripcion: 'Enfoque en opciones nutritivas.' },
  { imagen: soda, titulo: 'Compromiso educativo', descripcion: ' Promoción de la alimentación consciente' }
] 

function App() {
  return (
    <div className="pagina">
      {/* HEADER: todo lo que pongas aquí se verá arriba. */}
      <header className="header">
        <img src="src/styles/Img/icon.jpg" className="header-icon" />
        <h1 className="header-title">Soda armonia</h1>
      </header>
      <section className="carrousel-section">
        <h1>Armonia</h1>
        <BounceCards
          className="custom-bounceCards"
          images={carouselImages}
          containerWidth={600}
          containerHeight={320}
          animationDelay={1}
          animationStagger={0.08}
          easeType="elastic.out(1, 0.5)"
          transformStyles={carouselTransforms}
          enableHover
        />
      </section>
      <section className="General-section">
        <div className="general-section-col general-section-left">
          <h1>Sobre nosotros</h1>
          <p>La Soda Armonía del CTP CIT es un espacio pensado para ofrecer a los estudiantes, docentes y personal del colegio un ambiente agradable donde puedan disfrutar de alimentos y bebidas durante los distintos momentos del día. Este lugar se caracteriza por ser un punto de encuentro dentro de la institución, donde las personas pueden compartir, descansar y recargar energías entre clases.
            El espacio destaca por su ambiente acogedor y organizado, el cual busca brindar comodidad a todos los miembros de la comunidad educativa. La soda se mantiene como un lugar limpio, ordenado y bien cuidado, lo que contribuye a generar una experiencia agradable para quienes la visitan. Además, el entorno promueve la convivencia y el respeto, fomentando un ambiente armonioso acorde con el nombre del establecimiento.</p>
        </div>
        <div className="general-section-col general-section-right">
          <h1>Ubicación</h1>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4906.732716030498!2d-84.17680342411428!3d9.977201873424894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fbce33732ca3%3A0x7d946cf6f5855836!2sComplejo%20Educativo%20CIT!5e1!3m2!1ses!2scr!4v1773339809179!5m2!1ses!2scr"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Ubicación"
            ></iframe>
          </div>
        </div>
      </section>
      <section className="about-section">
        <h1>Caracteristicas de Armonia</h1>
        <p>Armonia ofrece diferentes servicios para la comunidad</p>
        <ServiceCards servicios={serviciosArmonia} />
      </section>
      {/* Sección de Jose David: Cancha sintética — estilos unificados con el resto de la página */}
      <section className="cancha-section">
        <h1>Cancha sintetica</h1>
        <p>Página informativa sobre la soda y la cancha sintética del CTP CIT.</p>
      </section>
    </div>
  )
}

export default App
