import React, { useEffect, useState } from "react";

function PerrosRandom() {
    // Estado para almacenar la URL de la imagen del perro
    const [imagen, setImagen] = useState(null);
    // Estado para controlar si está cargando la imagen
    const [loading, setLoading] = useState(true);

    const fetchDog = async () => {
        setLoading(true); // Activamos el estado de carga
        try {
            // Hacemos la petición a The Dog API para obtener una imagen con información de raza
            const res = await fetch("https://api.thedogapi.com/v1/images/search?has_breeds=1");
            const data = await res.json(); // Convertimos la respuesta a JSON
            setImagen(data[0].url); // Guardamos la URL de la imagen en el estado
        } catch (error) {
            console.error("Error al obtener la imagen del perro:", error);
        } finally {
            setLoading(false); // Desactivamos el estado de carga
        }
    };

    // useEffect se ejecuta cuando el componente se monta por primera vez
    useEffect(() => {
        fetchDog(); // Cargamos la primera imagen al inicializar el componente
    }, []); // Array vacío significa que solo se ejecuta una vez

    return (
        <section className="mascotas-home-img-section">
            <h2>¡Conoce un perrito aleatorio!</h2>
            {loading ? (
                // Mostramos mensaje de carga mientras se obtiene la imagen
                <p>Cargando...</p>
            ) : (
                <>
                    <img src={imagen} alt="Perro aleatorio" style={{ maxWidth: 300 }} />
                </>
            )}
            <button onClick={fetchDog} style={{ marginTop: 16 }}>
                Ver otro perrito
            </button>
        </section>
    );
}

export default PerrosRandom;