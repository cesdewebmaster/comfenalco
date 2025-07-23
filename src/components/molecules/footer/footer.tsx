import { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby';
import { scrollToTop } from '../../../utils/functions';

import './footer.scss'

// @ts-ignore
// import comfamaLogo from '../../../assets/images/logos/comfama/gray.svg';
import google from '../../../assets/images/logos/comfama/playstore.png';
import apple from '../../../assets/images/logos/comfama/apple.svg';
// @ts-ignore
import asocajasLogo from '../../../assets/images/CDA/image_asocajas.png';
// @ts-ignore
import pactoGLogo from '../../../assets/images/CDA/image_pacto-global.png';
// @ts-ignore
import vigiladaLogo from '../../../assets/images/CDA/image_vigilada.png';
// @ts-ignore
import iconArrowUp from '../../../assets/icons/CDA/icon_arrow-up.svg';


const footer = () => {

    const { allContentfulTemplate } = useStaticQuery(
        graphql`query GET_CAD_FOOTER_CONTENT {
            allContentfulTemplate(filter: { nombre: { eq: "Footer CAD" } }) {
              nodes {
                referencias {
                  h2
                  referencias {
                    h3
                    url
                    image {
                      title
                      file {
                        url
                      }
                    }
                  }
                }
                span
                span2
                image {
                  title
                  file {
                    url
                  }
                }
              }
            }
        }`
    );

    const socialNetworks = allContentfulTemplate.nodes[0].referencias[3].referencias.map((social: any) => {
        const item = {
            name: social.image[0].title,
            url: social.url,
            icon: social.image[0].file.url
        }

        return item;
    });
    const accordionsData = allContentfulTemplate.nodes[0].referencias.map((accordItem: any) => {
        const item = {
            name: accordItem.h2,
            links: accordItem.referencias
        }
        return item;
    }).slice(0, 3);

    const [selectedAccord, setSelectedAccord] = useState<number>(-1);

    const toggleOpen = (index: number) => {
        setSelectedAccord(selectedAccord === index ? -1 : index)
    }

    return (
        <footer className='m-footer'>
            <div className='m-footer__desktop-divider'>
                <div className='m-footer__accordions'>
                    {
                        accordionsData.map((accordItem: any, index: number) => (
                            <div
                                className={`a-accordions__item ${(selectedAccord === index) ? 'a-accordions__item--open' : ''}`}
                                key={accordItem.name}
                            >
                                <div className='a-accordions__item-action cda-main-container' onClick={() => toggleOpen(index)}>
                                    <p>{accordItem.name}</p>
                                    <p aria-label='Botón expandir-contraer'>{(selectedAccord === index) ? '-' : '+'}</p>
                                </div>
                                <div className='a-accordions__item-content cda-main-container'>
                                    {
                                        accordItem.links.map((link: any) => (
                                            <a key={link.h3} href={link.url} target='_blank'>{link.h3}</a>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='m-footer__desktop-divider-child'>
                    <div className='m-footer__networks cda-main-container'>
                        <p>{allContentfulTemplate.nodes[0].referencias[3].h2}</p>
                        <div className='a-networks__icons'>
                            {
                                socialNetworks.map((network: any) => (
                                    <a href={network.url} target='_blank' key={network.name}>
                                        <img src={network.icon} alt={network.name} title={network.name} />
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                    <div className='m-footer__pacts cda-main-container'>
                        <p>{allContentfulTemplate.nodes[0].referencias[4].h2}</p>
                        <div className='pacts-box'>
                            {/* <img src={asocajasLogo} alt="Logo asocajas" height='32' /> */}
                            {/* <img src={pactoGLogo} alt="Logo pacto-global Red Colombia" height='34' /> */}
                            <a href="https://www.ssf.gov.co/" target='_blank'>
                            <img src={vigiladaLogo} alt="Logo vigilado Súper subsidio" height='25' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='m-footer__final-content cda-main-container'>
                <div className='final-content__actions'>
                    {/* <img src={comfamaLogo} alt="Logo Comfama" /> */}
                    <div className='logos-descarga'>
                        <a href="https://play.google.com/store/apps/details?id=comfenalco.app.com.comfenalcoapp&hl=es_CO" target='_blank'>
                            <img src={google} title="Descarga desde la Play Store" />
                        </a>
                        <a href="https://apps.apple.com/co/app/comfenalco/id1475981695" target='_blank'>
                            <img src={apple} title="Descarga desde la App Store" />
                        </a>
                    </div>
                    <button id='btnScrollTop' onClick={scrollToTop}>
                        <img src={iconArrowUp} alt="Botón ir al principio de la página" />
                    </button>
                </div>
                <div className='final-content__texts'>
                    <small>{allContentfulTemplate.nodes[0].span}</small>
                    <small>{allContentfulTemplate.nodes[0].span2}</small>
                </div>
            </div>
        </footer>
    )
}

export default footer