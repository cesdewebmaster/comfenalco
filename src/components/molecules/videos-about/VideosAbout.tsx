// import { useState } from 'react';
// import { useStaticQuery, graphql } from 'gatsby';
// import './VideosAbout.scss';

// import VideoModal from '../../atoms/video-modal/VideoModal';


// // @ts-ignore
// import iconArrowR from '../../../assets/icons/CDA/icon_flecha_blanca.svg';

// const VideosAbout = () => {

//     const { allContentfulTemplate } = useStaticQuery(graphql`
//         query GET_CDA_TE_ACOMPANAMOS {
//         allContentfulTemplate(filter: { nombre: { eq: "Te acompañamos" } }) {
//             nodes {
//             h2
//             h3
//             referencias {
//                 h2
//                 span
//                 image {
//                 title
//                 file {
//                     url
//                 }
//                 }
//             }
//             button {
//                 copy
//                 copy2
//                 url
//                 icono {
//                 file {
//                     url
//                 }
//                 }
//             }
//             }
//         }
//     }
//     `);

//     const videoAboutContent = {
//         title: allContentfulTemplate.nodes[0].h2,
//         description: allContentfulTemplate.nodes[0].h3,
//         videoData: {
//             title: allContentfulTemplate.nodes[0].referencias[0].h2,
//             thumbnail: allContentfulTemplate.nodes[0].referencias[0].image[0].file.url,
//             linkID: allContentfulTemplate.nodes[0].referencias[0].span
//         },
//         referenceData: {
//             title: allContentfulTemplate.nodes[0].button[0].copy,
//             description: allContentfulTemplate.nodes[0].button[0].copy2,
//             thumbnail: allContentfulTemplate.nodes[0].button[0].icono.file.url,
//             url: allContentfulTemplate.nodes[0].button[0].url
//         }
//     }

//     const [showVideo, setShowVideo] = useState<boolean>(false);

//     const closeVideoModal = () => {
//         document.body.classList.remove("noscroll");
//         setShowVideo(false);
//     }

//     return (
//         <div className='m-videos-about-container'>
//             <div className='m-videos-about'>
//                 <div className="m-videos-about__title-box">
//                     <h4>{videoAboutContent.title}</h4>
//                     <p>{videoAboutContent.description}</p>
//                 </div>

//                 <div className='m-box-containers'>
//                     <div
//                         tabIndex={0}
//                         role='button'
//                         aria-label={`Botón para abrir video de ${videoAboutContent.videoData.title}`}
//                         className={`a-box-video gtmTeacompañamos${videoAboutContent.videoData.title.replace(/ /g, '')}`}
//                         onClick={() => setShowVideo(true)}
//                         style={{ backgroundImage: `url(${videoAboutContent.videoData.thumbnail})` }}
//                     >
//                         <i className={`icon-play-circle gtmTeacompañamos${videoAboutContent.videoData.title.replace(/ /g, '')}`}></i>
//                         <p className={`gtmTeacompañamos${videoAboutContent.videoData.title.replace(/ /g, '')}`}>{videoAboutContent.videoData.title}</p>
//                     </div>
//                     <a
//                         aria-label={`Enlace a ${videoAboutContent.referenceData.title} ${videoAboutContent.referenceData.description}`}
//                         className={`a-box-reference gtmTeacompañamos${videoAboutContent.referenceData.title.replace(/ /g, '')}`}
//                         href={videoAboutContent.referenceData.url}
//                         style={{ backgroundImage: `url(${videoAboutContent.referenceData.thumbnail})` }}
//                     >
//                         <p className={`gtmTeacompañamos${videoAboutContent.referenceData.title.replace(/ /g, '')}`}>{videoAboutContent.referenceData.title}</p>
//                         <p className={`gtmTeacompañamos${videoAboutContent.referenceData.title.replace(/ /g, '')}`}>{videoAboutContent.referenceData.description}</p>
//                         <img
//                             src={iconArrowR}
//                             alt="ícono de ir a la página"
//                             className={`gtmTeacompañamos${videoAboutContent.referenceData.title.replace(/ /g, '')}`}
//                         />
//                     </a>

//                     {
//                         showVideo &&
//                         <VideoModal
//                             linkID={videoAboutContent.videoData.linkID}
//                             closeVideoModal={closeVideoModal}
//                         />
//                     }

//                 </div>

//             </div>
//         </div>
//     )
// }

// export default VideosAbout
import React from 'react'

const VideosAbout = () => {
  return (
    <div>
    </div>
  )
}

export default VideosAbout
