import { useEffect } from 'react';
import { Link } from 'gatsby';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "react-headless-accordion";

import './SectionList.scss';
import { Category, Subcategory, Section } from '../../../interfaces/Article.interface';
import { hasStartSlash } from '../../../utils/functions';

interface Props {
  selectedSubcategory: Category | Subcategory
}

const SectionList = ({ selectedSubcategory }: Props) => {

  useEffect(() => {
    if (localStorage.getItem('clicked-section')) {
      const idSection = localStorage.getItem('clicked-section')!;
      document.getElementById(idSection)?.scrollIntoView({ block: 'center' });
      localStorage.removeItem('clicked-section');
    }
  }, []);


  return (
    <div className='m-section-list'>
      <div className='m-section-list__title-box'>
        <h1>{selectedSubcategory?.name}</h1>
        <p>{selectedSubcategory?.desc}</p>
      </div>

      <hr />

      <Accordion>
        {
          selectedSubcategory?.sections!.map((section: Section, index) => (
            <AccordionItem key={index}>
              {({ open }: any) => (
                <>
                  <div className='m-section-list__item' id={section.url}>
                    <div className='section-early-data'>
                      <h2>{section.name}</h2>
                      <div className='section-early-articles'>
                        {
                          section.articles?.slice(0, 4).map((article, index) => (
                            <h3 key={index} className={`gtmMenulateralsubcategoriasarticulos${article.name.replace(/ /g, '')}`}>
                              <div className="article-bullet"></div>
                              <Link
                                to={`${hasStartSlash(article.slug)}`}
                                className={`gtmMenulateralsubcategoriasarticulos${article.name.replace(/ /g, '')}`}
                              >
                                {article.name}
                              </Link>
                            </h3>
                          ))
                        }
                      </div>
                    </div>

                    {
                      (section.articles!.length > 4)
                      &&
                      <>
                        <AccordionBody>
                          <div className="section-late-articles">
                            {
                              section.articles!.slice(4).map((article, index) => (
                                <h3 key={index} className={`gtmMenulateralsubcategoriasarticulos${article.name.replace(/ /g, '')}`}>
                                  <div className="article-bullet"></div>
                                  <Link
                                    to={`${hasStartSlash(article.slug)}`}
                                    className={`gtmMenulateralsubcategoriasarticulos${article.name.replace(/ /g, '')}`}
                                  >
                                    {article.name}
                                  </Link>
                                </h3>
                              ))
                            }
                          </div>
                        </AccordionBody>

                        <AccordionHeader className='a-section-btn-see-more'>
                          <span>{open ? 'Ver menos' : 'Ver más'}</span>
                        </AccordionHeader>
                      </>
                    }
                  </div>
                </>
              )}
            </AccordionItem>
          ))
        }
      </Accordion>
    </div>
  )
}

export default SectionList