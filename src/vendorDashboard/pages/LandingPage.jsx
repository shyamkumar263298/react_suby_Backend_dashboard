import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showFirm, setShowFirm] = useState(false);
    const [showProduct, setShowProduct] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showFirmTitle, setShowFirmTitle] = useState(true);

    useEffect(() => {
        const loginToken = localStorage.getItem('loginToken');
        if (loginToken) {
            setShowLogout(true);
        }
    }, [])

    useEffect(() => {
        const firmName = localStorage.getItem('firmName');
        if (firmName) {
            setShowFirmTitle(false)
        }
    }, [])

    const logoutHandler = () => {
        confirm("are you sure, you want to logout?");
        localStorage.clear();
        setShowLogout(false);
        setShowFirmTitle(true);
    }

    const showProductHandler = () => {
        if (showLogout) {
            setShowRegister(false)
            setShowLogin(false)
            setShowFirm(false)
            setShowWelcome(false)
            setShowAllProducts(false)
            setShowProduct(true)
        } else {
            alert('Please login  to access add product');
            setShowLogin(true);
        }
    }
    const showFirmHandler = () => {
        if (showLogout) {
            setShowRegister(false)
            setShowLogin(false)
            setShowProduct(false)
            setShowWelcome(false)
            setShowAllProducts(false)
            setShowFirm(true)
        } else {
            alert('Please login  to access add firm');
            setShowLogin(true);
        }

    }
    const showRegisterHandler = () => {
        setShowLogin(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)
        setShowRegister(true)
    }
    const showLoginHandler = () => {
        setShowRegister(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)
        setShowLogin(true)
    }

    const showWelcomeHandler = () => {
        setShowRegister(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowLogin(false)
        setShowAllProducts(false)
        setShowWelcome(true)
    }

    const showAllProductsHandler = () => {
        if (showLogout) {
            setShowRegister(false)
            setShowFirm(false)
            setShowProduct(false)
            setShowLogin(false)
            setShowWelcome(false)
            setShowAllProducts(true)
        } else {
            alert('Please login  to access all product');
            setShowLogin(true);
        }
    }


    return (
        <>
            <section className='landingSection'>
                <NavBar
                    showLoginHandler={showLoginHandler}
                    showRegisterHandler={showRegisterHandler}
                    showLogout={showLogout}
                    logoutHandler={logoutHandler}
                />
                <div className="collectionSection">
                    <SideBar
                        showFirmTitle={showFirmTitle}
                        showFirmHandler={showFirmHandler}
                        showProductHandler={showProductHandler}
                        showAllProductsHandler={showAllProductsHandler}
                    />
                    {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
                    {showRegister && <Register showLoginHandler={showLoginHandler} />}
                    {showFirm && showLogout && <AddFirm />}
                    {showProduct && showLogout && <AddProduct />}
                    {showWelcome && <Welcome />}
                    {showAllProducts && showLogout && <AllProducts />}

                </div>

            </section>
        </>
    )
}

export default LandingPage
