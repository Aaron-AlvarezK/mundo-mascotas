import { useState, useEffect } from "react";
import alimentop from './img/alimentop.jpg';
import alimentog from './img/alimentog.jpg';
import arena from './img/arena.jpg';
import jugete from './img/jugete.jpg';
import huesos from './img/huesos.jpg';



// Guardaremos los productos en arrays
const productos = [
  { id: 1, nombre: "Alimento perro 15KG ", precio: 20000, img: alimentop },
  { id: 2, nombre: "Alimento Gato 15KG", precio: 17500, img: alimentog },
  { id: 3, nombre: "Arena para arenero 10KG", precio: 15000, img: arena },
  { id: 4, nombre: "Juguete de raton", precio: 3000, img: jugete},
  { id: 5, nombre: "Huesos de jugete", precio: 3000, img: huesos}
];

// Genera el siguiente número de carrito basado en sessionStorage
function generarNumeroCarroCompras() {
  let lastId = parseInt(sessionStorage.getItem("ultimoCarroComprasId") || "0", 10);
  return lastId + 1;
}

function Productos() {
  // Estado para los productos agregados al carro de compras actual
  const [carroCompras, setCarroCompras] = useState([]);
  // Estado para el número identificador del carro de compras actual
  const [carroComprasId, setCarroComprasId] = useState(generarNumeroCarroCompras());
  // Estado para la lista de carros de compras guardados
  const [carrosComprasGuardados, setCarrosComprasGuardados] = useState([]);
  // Estado para mostrar/ocultar la lista de carros de compras guardados
  const [mostrarGuardados, setMostrarGuardados] = useState(false);
  // Estado para saber si se está editando un carro de compras guardado (índice)
  const [editandoIdx, setEditandoIdx] = useState(null);

  // Al montar el componente, carga el carro de compras y los carros de compras guardados desde sessionStorage
  useEffect(() => {
    const guardado = sessionStorage.getItem("carroCompras");
    if (guardado) {
      setCarroCompras(JSON.parse(guardado));
    }
    const guardados = sessionStorage.getItem("carrosComprasGuardados");
    if (guardados) {
      setCarrosComprasGuardados(JSON.parse(guardados));
    }
  }, []);

  // Guarda el carro de compras actual en sessionStorage cada vez que cambia
  useEffect(() => {
    sessionStorage.setItem("carroCompras", JSON.stringify(carroCompras));
  }, [carroCompras]);

  // Agrega un producto al carro de compras
  const agregarAlCarroCompras = (producto) => {
    setCarroCompras([...carroCompras, producto]);
  };

  // Elimina un producto del carro de compras por su índice
  const eliminarDelCarroCompras = (index) => {
    const nuevoCarroCompras = carroCompras.filter((_, i) => i !== index);
    setCarroCompras(nuevoCarroCompras);
  };

  // Limpia el carro de compras actual y, si no se está editando, genera un nuevo número de carro de compras
  const limpiarCarroCompras = () => {
    setCarroCompras([]);
    sessionStorage.removeItem("carroCompras");
    setEditandoIdx(null);
    if (editandoIdx === null) {
      setCarroComprasId(generarNumeroCarroCompras());
    }
  };

  // Guarda el carro de compras actual en la lista de carros de compras guardados
  const guardarCarroCompras = () => {
    const guardados = JSON.parse(sessionStorage.getItem("carrosComprasGuardados") || "[]");
    const nuevoId = parseInt(sessionStorage.getItem("ultimoCarroComprasId") || "0", 10) + 1;
    const nuevoGuardado = {
      id: nuevoId,
      productos: carroCompras,
      total: carroCompras.reduce((acc, item) => acc + item.precio, 0),
      fecha: new Date().toLocaleString()
    };
    guardados.push(nuevoGuardado);
    sessionStorage.setItem("carrosComprasGuardados", JSON.stringify(guardados));
    sessionStorage.setItem("ultimoCarroComprasId", nuevoId);
    setCarrosComprasGuardados(guardados);
    alert(`¡Carro de compras #${nuevoId} guardado con éxito!`);
    limpiarCarroCompras();
    setCarroComprasId(nuevoId + 1);
  };

  // Guarda los cambios al editar un carro de compras guardado
  const guardarEdicion = () => {
    const guardados = JSON.parse(sessionStorage.getItem("carrosComprasGuardados") || "[]");
    guardados[editandoIdx] = {
      ...guardados[editandoIdx],
      productos: carroCompras,
      total: carroCompras.reduce((acc, item) => acc + item.precio, 0),
      fecha: new Date().toLocaleString()
    };
    sessionStorage.setItem("carrosComprasGuardados", JSON.stringify(guardados));
    setCarrosComprasGuardados(guardados);
    alert(`¡Carro de compras #${guardados[editandoIdx].id} editado con éxito!`);
    limpiarCarroCompras();
  };

  // Calcula el total del carro de compras actual
  const total = carroCompras.reduce((acc, item) => acc + item.precio, 0);

  return (
    <main className="main-content">
      <h2>Productos</h2>
      {/* Renderiza las tarjetas de productos */}
      <div className="products">
        {productos.map((prod) => (
          <div className="product-card" key={prod.id}>
            <img src={prod.img} alt={prod.nombre} className="product-img" />
            <h3>{prod.nombre}</h3>
            <span className="price">
              {/* Muestra el precio en formato CLP */}
              {prod.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
            </span>
            <button onClick={() => agregarAlCarroCompras(prod)}>Agregar al carro de compras</button>
          </div>
        ))}
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* Sección del carro de compras actual */}
      <div className="carro-compras-section">
        <h3>Carro de compras #{carroComprasId}</h3>
        {carroCompras.length === 0 ? (
          <p>El carro de compras está vacío.</p>
        ) : (
          <ul>
            {carroCompras.map((item, idx) => (
              <li key={idx}>
                {item.nombre} - {item.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                <button style={{ marginLeft: 10 }} onClick={() => eliminarDelCarroCompras(idx)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
        <p><strong>Total: {total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</strong></p>
        <button onClick={limpiarCarroCompras} disabled={carroCompras.length === 0}>
          Limpiar carro de compras
        </button>
        {editandoIdx === null ? (
          <button
            onClick={guardarCarroCompras}
            disabled={carroCompras.length === 0}
            style={{ marginLeft: 10 }}
          >
            Guardar carro de compras
          </button>
        ) : (
          <button
            onClick={guardarEdicion}
            disabled={carroCompras.length === 0}
            style={{ marginLeft: 10, background: "#ffa500" }}
          >
            Guardar cambios
          </button>
        )}
        <button
          onClick={() => setMostrarGuardados(!mostrarGuardados)}
          style={{ marginLeft: 10 }}
        >
          {mostrarGuardados ? "Ocultar carros de compras guardados" : "Mostrar carros de compras guardados"}
        </button>
      </div>

      {/* Lista de carros de compras guardados, si está activada */}
      {mostrarGuardados && (
        <div className="carros-compras-guardados-list" style={{ marginTop: 30 }}>
          <h3>Carros de compras guardados</h3>
          {carrosComprasGuardados.length === 0 ? (
            <p>No hay carros de compras guardados.</p>
          ) : (
            <ul>
              {carrosComprasGuardados.map((c, idx) => (
                <li key={idx}>
                  <strong>Carro de compras #{c.id}</strong> Total: {c.total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }) } - ({c.fecha})
                  <ul>
                    {c.productos.map((p, i) => (
                      <li key={i}>{p.nombre} - {p.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</li>
                    ))}
                  </ul>
                  <button
                    style={{ marginTop: 5, marginRight: 5 }}
                    onClick={() => {
                      // Carga el carro de compras guardado para editar
                      setCarroCompras(c.productos);
                      setCarroComprasId(c.id);
                      setEditandoIdx(idx);
                      setMostrarGuardados(false);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    style={{ marginTop: 5 }}
                    onClick={() => {
                      // Elimina el carro de compras guardado
                      const nuevos = carrosComprasGuardados.filter((_, i) => i !== idx);
                      setCarrosComprasGuardados(nuevos);
                      sessionStorage.setItem("carrosComprasGuardados", JSON.stringify(nuevos));
                      if (editandoIdx === idx) limpiarCarroCompras();
                    }}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}

export default Productos;