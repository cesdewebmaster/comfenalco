import { Link } from 'gatsby';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { Category } from '../../../interfaces/Article.interface';

import './HomeAccordeons.scss';

// @ts-ignore
import iconChevronR from '../../../assets/icons/CDA/icon_chevron-right.svg';
// @ts-ignore
import iconPlus from '../../../assets/icons/CDA/icon_plus.svg';
// @ts-ignore
import iconMinus from '../../../assets/icons/CDA/icon_minus.svg';



interface Props {
    dataCategoriesHome: {
        title: string,
        descrip: string,
        dataCategories: Category[];
    }
}

interface AcordionProps {
    state: any,
    item: Category
}

const AcordionHeader = ({ state, item }: AcordionProps) => {
    return (
        <>
            <div className={`a-accordeon-btn__title gtmExplorarporcategorias${item.name.replace(/ /g, '')}Home`}>
                <span>
                    <i
                        className={`${item.icon} gtmExplorarporcategorias${item.name.replace(/ /g, '')}Home`}
                        style={{ color: state.isEnter ? item.color : '' }}></i>
                </span>
                <h3 className={`gtmExplorarporcategorias${item.name.replace(/ /g, '')}Home ${state.isEnter ? 'accordion-active' : ''}`}>
                    {item.name}
                </h3>
            </div>
            <div className={`gtmExplorarporcategorias${item.name.replace(/ /g, '')}Home a-accordeon-btn__action ${state.isEnter ? 'open-acc' : ''}`}>
                {
                    (state.isEnter)
                        ? <img src={iconMinus} alt="Botón contraer" />
                        : <img className={`gtmExplorarporcategorias${item.name.replace(/ /g, '')}Home`} src={iconPlus} alt="Botón expandir" />
                }
            </div>
        </ >
    )
}

const HomeAccordeons = ({ dataCategoriesHome }: Props) => {

    return (
        <div className='m-home-accordion__container'>
            <div className='section__title'>
                <h2>{dataCategoriesHome.title}</h2>
                <p>{dataCategoriesHome.descrip}</p>
            </div>

            <Accordion transition transitionTimeout={300} className='m-home-accordion'>
                {dataCategoriesHome?.dataCategories?.map((item, index) => (
                    <AccordionItem
                        header={({ state }) => <AcordionHeader state={state} item={item} />}
                        buttonProps={{ className: `a-accordeon-btn gtmExplorarporcategorias${item.name.replace(/ /g, '')}Home` }}
                        panelProps={{ className: `a-accordeon-body` }}
                        className={({ status }) => `${(status === 'entered') ? 'open-acc' : ''}`}
                        key={index}
                    >
                        {
                            item.subcategories!.map(subcategory => (
                                <Link to={subcategory.slug}
                                    className={`a-accordeon-item gtmExplorarporcategoriassubcategorias${subcategory.name.replace(/ /g, '')}Home`}
                                    key={subcategory.name}
                                    style={{ borderLeft: `2px solid ${item.color}` }}>
                                    <div className={`a-accordeon-item__content gtmExplorarporcategoriassubcategorias${subcategory.name.replace(/ /g, '')}Home`}>
                                        <h4 className={`gtmExplorarporcategoriassubcategorias${subcategory.name.replace(/ /g, '')}Home`}>
                                            {subcategory.name}
                                        </h4>
                                        {/* <p>{dataCategory.desc}</p> */}
                                    </div>
                                    <img
                                        className={`gtmExplorarporcategoriassubcategorias${subcategory.name.replace(/ /g, '')}Home`}
                                        src={iconChevronR}
                                        alt="icon_chevron-right"
                                    />
                                </Link>
                            ))
                        }
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )

}

export default HomeAccordeons