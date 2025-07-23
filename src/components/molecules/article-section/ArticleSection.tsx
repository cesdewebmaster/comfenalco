import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { Category, Subcategory } from '../../../interfaces/Article.interface';
import useBrowserMode from '../../../shared/hooks/useBrowserMode';

import Breadcumbs from '../../atoms/breadcumbs/Breadcumbs';
import ArticleRating from '../article-rating/ArticleRating';
import RelatedArticles from '../related-articles/RelatedArticles';

import './ArticleSection.scss';

interface Props {
    data: any,
    selectedSubcategory: Category | Subcategory
}

const ArticleSection = ({ data, selectedSubcategory }: Props) => {

    const { window } = useBrowserMode();

    // Verifica que body exista y sea un array
    const body = Array.isArray(data?.body) ? data.body : [];

    const description = body?.filter((itemBody: any) => itemBody.descripcion?.references?.length > 0);

    const descriptionData = (description?.length > 0 && description[0]?.descripcion)
        ? description[0].descripcion
        : description;

    const imagesReferences = descriptionData?.references;

    const options = {
        renderNode: {
            [BLOCKS.HEADING_1]: (_node: any, children: any) =>
                (<h1>{children}</h1>),

            [BLOCKS.HEADING_2]: (_node: any, children: any) =>
                (<h2>{children}</h2>),

            [BLOCKS.HEADING_3]: (_node: any, children: any) =>
                (<h3>{children}</h3>),

            [BLOCKS.PARAGRAPH]: (_node: any, children: any) =>
                (<p className='a-paragraph'>{children}</p>),

            [BLOCKS.UL_LIST]: (_node: any, children: any) =>
                (<ul className='m-unorder-list'>{children}</ul>),

            [BLOCKS.OL_LIST]: (_node: any, children: any) =>
                (<ol className='m-order-list'>{children}</ol>),

            [BLOCKS.LIST_ITEM]: (_node: any, children: any) =>
                (<li className='a-list-item'>
                    <div className='bullet'></div>
                    {children}
                </li>),

            [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
                const dataNode = imagesReferences?.find(
                    (img: any) => node?.data?.target?.sys?.id === img.contentful_id
                );
                return (<img src={dataNode?.file?.url} alt={`Imagen ${dataNode?.title}`} />);
            },

            [INLINES.HYPERLINK]: (node: any, children: any) =>
                (<a
                    rel="noopener noreferrer"
                    href={node?.data?.uri}
                >
                    {children}
                </a>)
        }
    };

    const handleGoTo = (url: string) => {
        window.location.href = url;
    };

    return (
        <section className="m-article-section">
            <Breadcumbs
                selectedSubcategory={selectedSubcategory}
                articleName={data.name}
            />

            <div className='m-article-content'>
                <h1 className='m-article-content__title'>{data.name}</h1>
                <div className='m-article-content__body'>
                    {
                        body.length > 0 ? (
                            body.map((itemBody: any, index: number) => (
                                (itemBody.tipoComponente === 'boton' && itemBody.boton && itemBody.boton[0])
                                    ?
                                    <button
                                        key={index}
                                        onClick={() => handleGoTo(itemBody.boton[0].url)}
                                    >
                                        {itemBody.boton[0].copy}
                                    </button>
                                    :
                                    (itemBody.tipoComponente === 'texto' && itemBody.descripcion?.raw)
                                        ?
                                        documentToReactComponents(JSON.parse(itemBody.descripcion.raw), options)
                                        :
                                        <div key={index} style={{ display: 'none' }}>
                                            <pre>{itemBody.h3}, {itemBody.idVideo}</pre>
                                            {itemBody.video?.[0]?.file?.url && (
                                                <img src={itemBody.video[0].file.url} alt="" />
                                            )}
                                        </div>
                            ))
                        ) : (
                            <p>No hay contenido disponible</p>
                        )
                    }
                </div>
            </div>

            <ArticleRating articleId={data.id} articleName={data.name} />

            <hr />

            <RelatedArticles data={data.relatedArticles} />

        </section>
    );
};

export default ArticleSection;
