import { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

import { CurrencySwitcherContext } from '../../contexts/currency-switcher.context';

import GET_PRODUCTS from '../../data/get-products.json';

import NavLinkButton from '../../components/nav-link-button/nav-link-button.component';
import NavSignInButton from '../../components/nav-sign-in-button/nav-sign-in-button.component';
import CurrencySwitcherLogo from '../../components/currency-switcher-logo/currency-switcher-logo.component';
import NavCartLogo from '../../components/nav-cart-logo/nav-cart-logo.component';
import CurrencySwitcherDropdown from '../../components/currency-switcher-dropdown/currency-switcher-dropdown.component';
import CurrencyModal from '../../components/currency-modal/currency-modal.component';

import { ReactComponent as CookLogo } from './../../assets/cooklogo.svg';

import './navigation.styles.scss';

const Navigation = () => {
  const [categories, setCategories] = useState([]);

  const { data } = GET_PRODUCTS;

  useEffect(() => {
    if (data) {
      const { categories } = data;
      setCategories(categories);
    }
  }, [data]);

  const { pathname } = useLocation();
  const currentPage = pathname.slice(1);

  const [selectedPage, setSelectedPage] = useState(currentPage);

  useEffect(() => {
    if (data && selectedPage === '') {
      const { categories } = data;
      setSelectedPage(categories[0].name);
    } else if (selectedPage !== '') {
      setSelectedPage(currentPage);
    }
  }, [data, currentPage]);

  const { isCurrencySwitcherOpen } = useContext(CurrencySwitcherContext);

  return (
    <>
      <header className="navigation">
        <div className="nav-links-container">
          {categories.map(category => (
            <NavLinkButton category={category} selectedPage={selectedPage} key={category.name} />
          ))}
        </div>
        <div onClick={() => setSelectedPage('')}>
          <Link className="logo-container" to="/">
            <CookLogo className="cook-logo" />
          </Link>
        </div>
        <div className="actions-container">
          <NavSignInButton selectedPage={selectedPage} />
          <CurrencySwitcherLogo />
          {isCurrencySwitcherOpen && (
            <CurrencyModal>
              <CurrencySwitcherDropdown />
            </CurrencyModal>
          )}
          <NavCartLogo />
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Navigation;
