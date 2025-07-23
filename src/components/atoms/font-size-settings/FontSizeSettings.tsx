import { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { changeFontSize } from '../../../utils/functions';

import './FontSizeSettings.scss';

type Device =
  | 'mobile'
  | 'desktop';

interface Props {
  device: Device
}


const FontSizeSettings = ({ device }: Props) => {

  const { fontSize } = useContext(GlobalContext);

  return (
    <>

      {
        (device === 'desktop')
          ?

          <div className='a-font-settings'>
            <div className='a-font-settings__legend'>
              <i className='a-font-size__top__small icon-font'></i>
              <p>{fontSize.get}%</p>
              <i className='a-font-size__top__large icon-font'></i>
            </div>
            <div className='a-font-settings__actions'>
              <div
                role="button"
                tabIndex={0}
                onClick={() => changeFontSize('-', fontSize)}
                onKeyDown={(e) => (e.code === 'Enter') && changeFontSize('-', fontSize)}
                aria-label='Botón para disminuir letra'
              >
                Disminuir
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => changeFontSize('+', fontSize)}
                onKeyDown={(e) => (e.code === 'Enter') && changeFontSize('+', fontSize)}
                aria-label='Botón para aumentar letra'
              >
                Aumentar
              </div>
            </div>
          </div>

          :

          <div className='a-font-settings-mobile'>
            <div className='a-btn-action'>
              <i className='icon-font'></i>
              <div onClick={() => changeFontSize('-', fontSize)}>Disminuir</div>
            </div>
            <p>{fontSize.get}%</p>
            <div className='a-btn-action'>
              <i className='icon-font'></i>
              <div onClick={() => changeFontSize('+', fontSize)}>Aumentar</div>
            </div>
          </div>

      }

    </>
  )
}

export default FontSizeSettings