import { useEffect } from 'react';
import './VideoModal.scss';

// @ts-ignore
import iconClose from '../../../assets/icons/CDA/icon_clear-search.svg';

interface Props {
    closeVideoModal: () => void,
    linkID: string
}

const VideoModal = ({ closeVideoModal, linkID }: Props) => {

    
    useEffect(() => {
        document.body.classList.add("noscroll");
    }, []);


    return (
        <div className='a-video-modal' onClick={closeVideoModal}>
            <div className='close-modal-icon'>
                <img src={iconClose} alt="ícono cerrar video" />
            </div>
            <iframe
                className='a-video-modal__player'
                src={`https://www.youtube.com/embed/${linkID}?autoplay=1;`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>
        </div>
    )
}

export default VideoModal