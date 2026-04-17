import { useState, useEffect } from 'react'
import './ServiceCards.css'

/**
 * Servicios de Armonía: cards con imagen arriba, descripción abajo.
 * Al hacer clic en la card se abre un popup con la imagen en grande.
 *
 * servicios = array de { imagen, titulo, descripcion }
 */
export default function ServiceCards({ servicios = [] }) {
  const [modalImage, setModalImage] = useState(null)

  const openModal = (imagen) => setModalImage(imagen)
  const closeModal = () => setModalImage(null)

  useEffect(() => {
    if (!modalImage) return
    const onEscape = (e) => e.key === 'Escape' && closeModal()
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [modalImage])

  return (
    <>
      <div className="service-cards-grid">
        {servicios.map((s, i) => (
          <article
            key={i}
            className="service-card"
            onClick={() => openModal(s.imagen)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                openModal(s.imagen)
              }
            }}
          >
            <div className="service-card-image-wrap">
              <img src={s.imagen} alt={s.titulo || 'Servicio'} className="service-card-image" />
            </div>
            <div className="service-card-body">
              {s.titulo && <h3 className="service-card-title">{s.titulo}</h3>}
              <p className="service-card-desc">{s.descripcion}</p>
            </div>
          </article>
        ))}
      </div>

      {modalImage && (
        <div
          className="service-modal-overlay"
          onClick={closeModal}
          onKeyDown={(e) => e.key === 'Escape' && closeModal()}
          role="dialog"
          aria-modal="true"
          aria-label="Ver imagen en grande"
        >
          <button type="button" className="service-modal-close" onClick={closeModal} aria-label="Cerrar">
            ×
          </button>
          <div className="service-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Vista ampliada" className="service-modal-image" />
          </div>
        </div>
      )}
    </>
  )
}
