import './styles/App.css'

/*
  ============================================
  PÁGINA PRINCIPAL - TODO ESTÁ AQUÍ
  ============================================
  Puedes usar etiquetas de HTML: <header>, <h1>, <h2>, <p>, <div>, <section>, <a>, <img>, etc.
  Solo una diferencia: en lugar de class="..." usa className="..." (porque "class" está reservado en JavaScript).

  IMPORTANTE: todo lo que quieras que se vea en pantalla tiene que estar DENTRO del return ().
  Si pones <header> o <p> fuera del return, no se mostrará.
*/

function App() {
  return (
    <div className="pagina">
      {/* HEADER: todo lo que pongas aquí se verá arriba. Puedes usar <header>, <h1>, <p>, <div>, etc. como en HTML. */}
      <header className="header">
        <h1>Pagina de Alvarito</h1>
        <p>Pagina informativa sobre la soda/cancha sintetica</p>
      </header>
      <main>
        <body className="body"></body>
      </main>
      <section className="section">
         <h1>Cancha sintetica</h1>
      </section>
    </div>
  )
}

export default App
