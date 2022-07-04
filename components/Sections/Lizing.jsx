import Image from 'next/image';
import { OrderLizingModal } from '../Modals/OrderLizingModal';
import { useState } from 'react';

export const Lizing = ({ lizingBlock, lizingImg, lizingTitle, lizingItems, lizingText, lizingBtn, lizingDots }) => {
  const [isModalShow, setModalShowStatus] = useState(false);

  return (
    <section id="lizing" className="lizing" ref={lizingBlock}>
      <div className="container">
        <div className="lizing__wrapper">
          <div className="lizing__image" ref={lizingImg}>
            <Image width="1000" height="600" objectFit="cover" src="/lizing-img.webp" alt="Лизинг" />
          </div>
          <div className="lizing__content">
            <h2 className="title lizing__title" ref={lizingTitle}>
              Лизинг
            </h2>
            <div className="lizing__items">
              <div className="lizing__item">
                <div ref={(e) => (lizingDots.current[0] = e)}>
                  <Image objectFit="contain" width="29" height="29" src="/dot-elem.svg" alt="icon" />
                </div>
                <p className="lizing__text" ref={(e) => (lizingItems.current[0] = e)}>
                  Наша Компания сотрудничает с ведущими поставщиками и производителями специальной техники и оборудования, что даёт нашим клиентам возможность приобрести в лизинг спецтехнику на максимально выгодных условиях.
                </p>
              </div>
              <div className="lizing__item">
                <div ref={(e) => (lizingDots.current[1] = e)}>
                  {' '}
                  <Image objectFit="contain" width="29" height="29" src="/dot-elem.svg" alt="icon" />
                </div>
                <p className="lizing__text" ref={(e) => (lizingItems.current[1] = e)}>
                  Лизинг позволяет юридическим лицам абсолютно легально оптимизировать налогообложение, относя лизинговые платежи на затраты, что намного уменьшает налогооблагаемую прибыль.
                </p>
              </div>
              <div className="lizing__item">
                <div ref={(e) => (lizingDots.current[2] = e)}>
                  {' '}
                  <Image objectFit="contain" width="29" height="29" src="/dot-elem.svg" alt="Лизинг" />
                </div>
                <p className="lizing__text" ref={(e) => (lizingItems.current[2] = e)}>
                  В момент окончания срока действия договора имущество, переданное в лизинг переходит в собственность клиента по остаточной (выкупной) стоимости.
                </p>
              </div>
            </div>
            <p className="lizing__info" ref={lizingText}>
              Если Вас интересует приобретение в лизинг, оставьте заявку и мы Вам перезвоним для уточнения подробностей.
            </p>
            <button onClick={() => setModalShowStatus(true)} className="lizing__btn intro__btn-red-hover" data-modal ref={lizingBtn}>
              Оставить заявку
            </button>
            <OrderLizingModal isOpen={isModalShow} closeModal={() => setModalShowStatus(false)} />
          </div>
        </div>
      </div>
    </section>
  );
};
