import './styles/App.css'
import BounceCards from './components/BounceCards'
import ServiceCards from './components/ServiceCards'
import { useState, useEffect } from "react";

// Imágenes del carrusel BounceCards (HEAD)
import arbol from './styles/Img/arbol.jpg'
import paletas from './styles/Img/paletas.jpg'
import image from './styles/Img/image.png'
import hojas from './styles/Img/hojas.jpg'
import hojita from './styles/Img/hojita.jpg'
import casado from './styles/Img/casado.jpeg'
import armonia from './styles/Img/armonia.jpg'
import soda from './styles/Img/soda.jpg'
import icon from './styles/Img/icon.jpg'

// Imágenes del carrusel principal y círculos (rama entrante)
import img1 from "./styles/images/image-1.jpg";
import img2 from "./styles/images/image-2.jpg";
import img3 from "./styles/images/image-3.jpg";
import img4 from "./styles/images/image-4.jpg";
import img5 from "./styles/images/brownies.png";
import img6 from "./styles/images/pastel-zanahoria.png";
import img7 from "./styles/images/pie-limon.png";
import img8 from "./styles/images/desayunos.png";
import img9 from "./styles/images/bebidas.jpg";
import img10 from "./styles/images/traesh-2.jpg";

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

// Lista de imágenes del carrusel BounceCards.
const carouselImages = [arbol, paletas, image, hojas, hojita]
const carouselTransforms = getTransformStyles(carouselImages.length)

// Servicios de Armonía: cada uno tiene imagen, título y descripción.
const serviciosArmonia = [
  { imagen: casado, titulo: 'Alimentación saludable', descripcion: 'Menús balanceados y de calidad.' },
  { imagen: armonia, titulo: 'Nutrición escolar', descripcion: 'Enfoque en opciones nutritivas.' },
  { imagen: soda, titulo: 'Compromiso educativo', descripcion: ' Promoción de la alimentación consciente' }
]

function App() {

  const circles = [
    {
      img: img5,
      text: "Deliciosos brownies llenos de dulce chocolate..."
    },
    {
      img: img6,
      text: "¡Pasteles de zanahoria que están para morirse!"
    },
    {
      img: img7,
      text: "Un pie de limón tanto ácido como sabroso."
    },
    {
      img: img8,
      text: "Desayunos típicos al verdadero estilo tico..."
    },
    {
      img: img9,
      text: "Refrescantes bebidas para los más sedientos."
    }
  ];

  const [circleIndex, setCircleIndex] = useState(0);

  const nextCircle = () => {
    setCircleIndex((circleIndex + 1) % circles.length);
  };

  const prevCircle = () => {
    setCircleIndex((circleIndex - 1 + circles.length) % circles.length);
  };

  const images = [
    {
      src: img1,
      text: "Acá puedes descansar mientras comes tu almuerzo..."
    },
    {
      src: img2,
      text: "¡Deliciosos postres que ni una repostería se compara!"
    },
    {
      src: img3,
      text: "Desayunos típicos, ya me entra el apetito..."
    },
    {
      src: img4,
      text: "También cuenta con sillas externas para poder tener un respiro de aire fresco."
    },
    {
      src: img10,
      text: "¿Tienes basura? Hay muchos lugares en donde puedes botarla, en vez de tirarla en el suelo."
    }
  ];

  const [current, setCurrent] = useState(0);

  const siguiente = () => {
    setCurrent((current + 1) % images.length);
  };

  const anterior = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  // Cambio automático cada 3 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      siguiente();
    }, 3000);

    return () => clearInterval(intervalo);
  }, [current]);

  return (
    <div className="pagina">
      <header className="header">
        <img src={icon} alt="" className="header-icon" />
        <h1 className="header-title">Soda armonia</h1>
      </header>

      {/* Carrusel con imágenes y círculos (rama entrante) */}
      <main className="body">
        <h1 className="section-title">Nuestra soda</h1>
        <div className="body-intro">
          <p>En la soda Armonía hay una gran variedad de comida y bocadillos de los que puedes comprar, también incluyendo grandes espacios de descanso para comer tu comida.</p>
        </div>



        <div className="carrusel">

          <button onClick={anterior}>◀</button>

          <div className="imagen-container">

            <img
              key={current}
              className="imagen-carrusel"
              src={images[current].src}
              alt="Carrusel"
            />

            <div className="texto-imagen">
              {images[current].text}
            </div>

          </div>

          <button onClick={siguiente}>▶</button>

        </div>
        <h1 className="section-title">Productos:</h1>

        <p className="body-intro text-below-carrusel">En la soda puedes encontrar mucha comida deliciosa y otros productos para saciar tu hambre...</p>

        <div className="circle-carousel">

          <button onClick={prevCircle}>⬅️</button>

          <div className="circle-container">

            {circles.map((item, index) => (
              <div
                key={index}
                className={`circle ${circleIndex === index ? "active" : ""}`}
                onClick={() => setCircleIndex(index)}
              >
                <img src={item.img} alt="circle" />
              </div>
            ))}

          </div>

          <button onClick={nextCircle}>➡️</button>

        </div>

        <p className="circle-text">
          {circles[circleIndex].text}
        </p>
        <div className="indicadores">
          {images.map((_, index) => (
            <span
              key={index}
              className={current === index ? "activo" : ""}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>

      </main>

      {/* Sección BounceCards y resto (HEAD) */}
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

    </div>
  )
}

export default App
