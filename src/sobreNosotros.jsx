import logo from './img/logo.jpg';
import pelota from './img/pelota.jpg';


function SobreNosotros() {
    return (
        <main className="mascotas-main-content mascotas-about-section">
            <h2 className="mascotas-about-title">Sobre Nosotros</h2>
            <div className="mascotas-about-content">
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <img
                        src={logo}
                        alt="Mascota feliz"
                        className="mascotas-about-img"
                    />
                    <img
                        src={pelota}
                        alt="Productos para mascotas"
                        className="mascotas-about-img"
                    />
                </div>
                <div className="mascotas-about-text">
                    <p>
                        <strong>Mundo Mascotas</strong> nació en 2020 con el sueño de crear un espacio donde cada mascota y su familia encuentren todo lo que necesitan para una vida feliz y saludable.
                    </p>
                    <p>
                        Somos una tienda familiar ubicada en el corazón de la ciudad, dedicada a ofrecer productos de calidad para perros, gatos y otras mascotas. Desde alimentos premium, juguetes, accesorios y arenas, hasta productos de cuidado y bienestar, seleccionamos cada artículo pensando en el bienestar de tu mejor amigo.
                    </p>
                    <p>
                        Nuestro equipo está formado por amantes de los animales, siempre dispuestos a ayudarte y asesorarte para que encuentres lo mejor para tu compañero peludo. Creemos que cada mascota merece amor, respeto y una vida plena.
                    </p>
                </div>
            </div>
        </main>
    );
}


export default SobreNosotros;