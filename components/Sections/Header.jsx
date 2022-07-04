import Link from 'next/link';
import { useEffect, useState } from 'react';
import { OrderCallModal } from '../Modals/OrderCallModal';
import Script from 'next/script';
import { useRouter } from 'next/router';

export const Header = () => {
  const [isModalShow, setModalShowStatus] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { string } = router.query;
    console.log(router.query);
    if (string) {
      setSearch(string);
    }
  }, [router.query]);

  const onSearch = () => {
    router.push(`/catalog/search/${search}`);
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="header__logo">
            <Link href="/">
              <a>
                <img src="/logo.svg" alt="logo" />
              </a>
            </Link>
            <p className="header__logo-text">Вилочные погрузчики и техника для склада с доставкой по России</p>
          </div>
          <Link href="/">
            <a className="header__mobile-logo">
              <img src="/logo.svg" alt="logo" />
            </a>
          </Link>
          <div>
            <div className="header__location">
              <div className="header__location-icon">
                <img src="/location-icon.svg" alt="location" />
              </div>
              <div className="header__location-info">
                <div className="header__location-city">Москва</div>
                <div className="header__location-address">Лихоборская набережная дом 3</div>
              </div>
            </div>{' '}
            <div className="header__telephone" style={{ marginTop: '16px' }}>
              <div className="header__telephone-icon">
                <img src="/call-icon.svg" alt="call" />
              </div>
              <a href="tel:+74951667733" className="header__telephone-number">
                +7 (495) 166-77-33
              </a>
            </div>
          </div>
          <div className="header__search">
            {' '}
            <input placeholder="Поиск..." name="name" type="text" onChange={(e) => setSearch(e.target.value)} className="modal__input header__search-input" autoComplete="off" value={search} />
            <button onClick={() => onSearch()} className="header__search-btn"></button>
          </div>
          <div onClick={() => setModalShowStatus(true)} className="header__btn intro__btn-red-hover" data-modal>
            Заказать звонок
          </div>
          <OrderCallModal isOpen={isModalShow} closeModal={() => setModalShowStatus(false)} /> {/*не влияет на вёрстку, это модальное окно которое будет отбражатся при клике на .header__btn */}
        </div>
        <nav className="nav">
          <ul className="nav__menu">
            <li>
              <Link href="/catalog/categories/0">
                <a className="nav__link">Каталог</a>
              </Link>
            </li>
            <li>
              <Link href="/#delivery">
                <a className="nav__link">Доставка</a>
              </Link>
            </li>
            <li>
              <Link href="/#lizing">
                <a className="nav__link">Лизинг</a>
              </Link>
            </li>
            <li>
              <Link href="/company">
                <a className="nav__link">О компании</a>
              </Link>
            </li>
            <li>
              <Link href="/service">
                <a className="nav__link">Сервис и запчасти</a>
              </Link>
            </li>
            <li>
              <Link href="/news-catalog">
                <a className="nav__link">Новости</a>
              </Link>
            </li>
            <li>
              <a href="#footer" className="nav__link">
                Контакты
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mobile-menu">
        <nav className="mobile-nav">
          <ul className="mobile-nav__menu">
            <li>
              <Link href="/catalog/categories/0">
                <a className="mobile-nav__link">Каталог</a>
              </Link>
            </li>
            <li>
              <a href="#delivery" className="mobile-nav__link">
                Доставка
              </a>
            </li>
            <li>
              <a href="#lizing" className="mobile-nav__link">
                Лизинг
              </a>
            </li>
            <li>
              <Link href="/company">
                <a className="mobile-nav__link">О компании</a>
              </Link>
            </li>
            <li>
              <Link href="/service">
                <a className="mobile-nav__link">Сервис и запчасти</a>
              </Link>
            </li>
            <li>
              <Link href="/news-catalog">
                <a className="mobile-nav__link">Новости</a>
              </Link>
            </li>
            <li>
              <a href="#footer" className="mobile-nav__link">
                Контакты
              </a>
            </li>
          </ul>
        </nav>
        <div className="menu__location">
          <div className="menu__location-icon">
            <img src="/location-icon.svg" alt="location" />
          </div>
          <div className="menu__location-info">
            <div className="menu__location-city">Москва</div>
            <div className="menu__location-address">Лихоборская набережная дом 3, строение 9</div>
          </div>
        </div>
        <div className="menu__telephone">
          <div className="menu__telephone-icon">
            <img src="/call-icon.svg" alt="call" />
          </div>
          <a href="tel:+74951667733" className="menu__telephone-number">
            +7 (495) 166-77-33
          </a>
        </div>
        <button className="menu__call-btn">Заказать звонок</button>
        <div className="menu__social">
          <div className="menu__social-item">
            <a href="#">
              <img src="/social-icons/youtube.svg" alt="" />{' '}
            </a>
          </div>

          <div className="menu__social-item">
            <a href="https://api.whatsapp.com/send/?phone=79167377607&text=Обязательно отправьте это сообщение и дождитесь ответа&app_absent=0">
              <img src="/social-icons/whatsapp.svg" alt="" />{' '}
            </a>
          </div>
        </div>
      </div>

      <Script type="text/javascript" src="/js/nouislider.min.js" strategy="lazyOnload" />
      <Script type="text/javascript" src="/js/main.min.js" strategy="lazyOnload" />
    </header>
  );
};
