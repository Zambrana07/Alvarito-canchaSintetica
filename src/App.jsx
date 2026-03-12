import './styles/App.css'
import { useState, useEffect } from "react";

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
        <h1>Pagina de Alvarito</h1>
        <p>Pagina informativa sobre la soda/cancha sintetica</p>
      </header>

      <main className="body">
        <p>En la soda Armonía hay una gran variedad de comida y bocadillos de los que puedes comprar, también incluyendo grandes espacios de descanso para comer tu comida.</p>

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

<p>En la soda puedes encontrar mucha comida deliciosa y otros productos para saciar tu hambre...</p>

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

      <section className="section">
      </section>

    </div>
  )
}

export default App