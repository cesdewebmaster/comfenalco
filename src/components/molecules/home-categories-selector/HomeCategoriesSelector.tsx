import { useState } from 'react';
import { Category } from '../../../interfaces/Article.interface';
import SubcategoryBox from '../../atoms/subcategory-box/SubcategoryBox';
import './HomeCategoriesSelector.scss';

interface Props {
    dataCategoriesHome: {
        title: string,
        descrip: string,
        dataCategories: Category[];
    }
}

const HomeCategoriesSelector = ({ dataCategoriesHome }: Props) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const toggleCategory = (categoryName: string) => {
        setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
    };

    return (
        <div className='m-home-categories-selector'>
            <div className='categories-selector__sidebar'>
                <div className='new_category'>
                    <div className='subcategory_pyme_colaborativo'>
                        <h2>¿Qué es MiPyme Evoluciona?</h2>
                        <p>Es un programa de Fomento Empresarial que busca fortalecer las capacidades de Innovación, productividad y sostenibilidad de las MiPymes Afiliadas a la Caja de Compensación Comfenalco, mediante el acompañamiento personalizado y asistencias técnicas especializadas, contribuyendo a la competitividad y al fortalecimiento del tejido empresarial de Cartagena y Bolívar</p>
                    </div>

                    <div className='subcategory_pyme_colaborativo'>
                        <h2>¿Qué vas a encontrar en este canal colaborativo?</h2>
                        <p>Este canal ofrece a las empresas un acceso a contenidos de valor centralizados en una Biblioteca Empresarial, que actúa como un repositorio de contenido enfocado en temáticas clave y brechas empresariales. Además, es un canal de comunicación que facilita la gestión empresarial, conectándolas de manera eficiente con el ecosistema empresarial, lo que les permite acceder a servicios y soluciones que potencian su crecimiento.</p>
                    </div>
                </div>
                <div className='link_mipyme'>
                    <h2>¡Optimiza el potencial de tu empresa, vincúlate al programa MiPyme Evoluciona!</h2>
                    <a href="https://forms.office.com/pages/responsepage.aspx?id=ce8B1hSdqEuFdwjJEWNMQ_9KbfdqAExDrNGDboq3TutUQVIxWEtaMlA1UFdCUDRDWjJCUllMTUZCWS4u&origin=lprLink&route=shorturl" target='_blank'>
                        <button>
                            <span>Vincúlate</span>
                        </button>
                    </a>
                    
                </div>
                <div className='a-sidebar__title'>
                    <h2>{dataCategoriesHome.title}</h2>
                    <p>{dataCategoriesHome.descrip}</p>
                </div>
                <div className='a-sidebar__categories'>
                    {
                        dataCategoriesHome.dataCategories.map(category => (
                            <div key={category.name} className='category-box'>
                                <button
                                    className={`accordion ${expandedCategory === category.name ? 'active-category' : ''}`}
                                    onClick={() => toggleCategory(category.name)}
                                >
                                    <div className='category-icon'>
                                        <i className={`${category.icon}`} style={{ color: category.color }}></i>
                                    </div>
                                    <p>{category.name}</p>
                                </button>
                                {expandedCategory === category.name && (
                                    <div className='accordion-content'>
                                        <h2 className='a-subcategories__text'>Resuelve tus dudas sobre {category.name.toLowerCase()}</h2>
                                        <div className="a-subcategories__list">
                                            {
                                                category.subcategories.map(subcategory => (
                                                    <SubcategoryBox
                                                        key={subcategory.name}
                                                        subcategory={subcategory}
                                                        color={category.color}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default HomeCategoriesSelector;
