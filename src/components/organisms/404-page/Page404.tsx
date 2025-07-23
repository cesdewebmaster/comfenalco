import { Link } from 'gatsby';
import './Page404.scss';

// @ts-ignore
import image404 from '../../../assets/images/CDA/image_page-404.svg';

const Page404 = () => {
    return (
        <div className="m-not-found-page">
            <div className="m-not-found-page__container cda-main-container">
                <div className='box-1'>
                    <h2>¡Vaya!</h2>
                    <p>
                        La página a la que quieres ingresar no existe, pero ¿qué tal si regresas al inicio para continuar navegando nuestro sitio web? Encuentra oportunidades y conversaciones que tenemos para ti.
                    </p>
                    <img src={image404} alt="imagen de error 404" />
                    <div className='a-btn-container'>
                        <Link to="/">Ir al inicio</Link>
                    </div>
                </div>
                <img className='box-2' src={image404} alt="imagen de error 404" />
            </div>
        </div>
    )
}

export default Page404