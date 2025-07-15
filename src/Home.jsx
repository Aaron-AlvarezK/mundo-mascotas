import logo from "./img/logo.jpg";
<<<<<<< HEAD
=======
import PerrosRandom from "./PerrosRandom";
>>>>>>> 3d35522 (golaaaa)

function Home() {
    return (
        <main className="mascotas-main-content mascotas-home-section">
<<<<<<< HEAD
        <section className="mascotas-home-bienvenida">
            <img src={logo} alt="Logo Mundo Mascotas" className="mascotas-home-logo" />
            <h1>¡Bienvenido a Mundo Mascotas!</h1>
            <p>
            Tu tienda de confianza para consentir a tus mejores amigos. Aquí encontrarás alimentos, juguetes, accesorios y mucho más para perros, gatos y otras mascotas.
            </p>
        </section>
        <section className="mascotas-home-img-section">
            <div className="mascotas-home-frase">
            <h2>¡Todo para la felicidad y bienestar de tu mascota!</h2>
            <p>
                Productos seleccionados, atención personalizada y mucho amor por los animales.
            </p>
            </div>
        </section>
        </main>
    );
    }
=======
            <section className="mascotas-home-bienvenida">
                <img src={logo} alt="Logo Mundo Mascotas" className="mascotas-home-logo" />
                <h1>¡Bienvenido a Mundo Mascotas!</h1>
                <p>
                    Tu tienda de confianza para consentir a tus mejores amigos. Aquí encontrarás alimentos, juguetes, accesorios y mucho más para perros, gatos y otras mascotas.
                </p>
            </section>

            <PerrosRandom />

            <section className="mascotas-home-img-section">
                <div className="mascotas-home-frase">
                    <h2>¡Todo para la felicidad y bienestar de tu mascota!</h2>
                    <p>
                        Productos seleccionados, atención personalizada y mucho amor por los animales.
                    </p>
                </div>
            </section>
        </main>
    );
}
>>>>>>> 3d35522 (golaaaa)

export default Home;