import React, { useState } from "react";

function Contacto() {
  // Estado para los mensajes guardados
  const [mensajes, setMensajes] = useState(() =>
    JSON.parse(localStorage.getItem("mensajesContacto") || "[]")
  );
  // Estados para los campos del formulario
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    sexo: "",
    promos: false,
    fecha: new Date().toLocaleDateString(),
    mensaje: ""
  });

  // Maneja cambios en los campos del formulario
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Envía el formulario y guarda el mensaje en localStorage
  const handleSubmit = e => {
    e.preventDefault();
    const nuevo = { ...form, id: Date.now() };
    const nuevosMensajes = [nuevo, ...mensajes];
    setMensajes(nuevosMensajes);
    localStorage.setItem("mensajesContacto", JSON.stringify(nuevosMensajes));
    setForm({
      nombre: "",
      email: "",
      telefono: "",
      sexo: "",
      promos: false,
      fecha: new Date().toLocaleDateString(),
      mensaje: ""
    });
  };

  return (
    <main className="mascotas-main-content mascotas-contact-section">
      <h2>Contacto</h2>
      <form className="mascotas-contact-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Teléfono:
          <input min={1} type="number" name="telefono" value={form.telefono} onChange={handleChange} required />
        </label>
        <label>
          Sexo:
          <select name="sexo" value={form.sexo} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </label>
        <label>
          ¿Le gustan los animales?
          <input type="checkbox" name="promos" checked={form.promos} onChange={handleChange} />
        </label>
        <label>
          Fecha de envío:
          <input type="text" value={form.fecha} readOnly />
        </label>
        <label>
          Mensaje:
          <textarea name="mensaje" value={form.mensaje} onChange={handleChange} required />
        </label>
        <button type="submit">Enviar</button>
      </form>

      <div className="mascotas-mensajes-section" style={{ marginTop: 32 }}>
        <h3>Mensajes enviados</h3>
        {mensajes.length === 0 ? (
          <p>No hay mensajes enviados.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="mascotas-mensajes-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Sexo</th>
                  <th>Le gustan los animales</th>
                  <th>Fecha</th>
                  <th>Mensaje</th>
                </tr>
              </thead>
              <tbody>
                {mensajes.map(m => (
                  <tr key={m.id}>
                    <td><strong>{m.nombre}</strong></td>
                    <td>{m.email}</td>
                    <td>{m.telefono}</td>
                    <td>{m.sexo}</td>
                    <td>{m.promos ? "Sí" : "No"}</td>
                    <td>{m.fecha}</td>
                    <td className="mascotas-mensaje-texto">{m.mensaje}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

export default Contacto;