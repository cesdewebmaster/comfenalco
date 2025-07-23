import './ArticleRating.scss';
import { useHandleChoice } from '../../../hooks/useHandleChoice';

interface Props {
    articleId: string,
    articleName: string
}

const ArticleRating = ({ articleId, articleName }: Props) => {

    const { choices, selectedChoice, handleChoice } = useHandleChoice(articleId);

    return (
        <div className='m-rating-article'>
            <div className="rating-box">
                <p tabIndex={0}>{selectedChoice.name
                    ? 'Gracias por tu respuesta'
                    : '¿Te resultó útil este contenido?'}
                </p>
                <div className='choices'>
                    {
                        choices.map(({ name, value }) => (
                            <div
                                key={name}
                                className={`choices__item ${value ? `gtmArticuloLike${articleName.replace(/ /g, '')}` : `gtmArticulodislike${articleName.replace(/ /g, '')}`}`}
                            >
                                <button
                                    className={`
                                        ${value ? `choices__item--like gtmArticuloLike${articleName.replace(/ /g, '')}` : `gtmArticulodislike${articleName.replace(/ /g, '')}`}
                                        ${selectedChoice.value === value ? 'selected-choice' : ''}
                                    `}
                                    onClick={() => handleChoice(value)}
                                    aria-label={`Responder con un ${name}`}
                                >
                                    <i className={`icon-icon_like ${value ? `gtmArticuloLike${articleName.replace(/ /g, '')}` : `gtmArticulodislike${articleName.replace(/ /g, '')}`}`}></i>
                                </button>
                                <small>{name}</small>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ArticleRating