import { Link } from "react-router-dom";


function Header() {
    return (
        <header className="header">
            <h1>Mundo Mascotas</h1>
            <nav>
                <ul className="nav-list">
                    <li>
                        <Link to="/Home" className="dropdown-toggle">Home</Link>
                    </li>
                    <li><Link to="/SobreNosotros">Sobre Nosotros</Link></li>
                    <li><Link to="/Contacto">Contacto</Link></li>
                    <li><Link to="/Productos">Productos</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;