import React, { useEffect, useState, createContext } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import "./responsive.css"
import Header from './components/Header'
import Footer from './components/Footer'
import HubLandingPage from './Pages/LandingPage'
import Home from './Pages/Home'
import ProductListing from './Pages/ProductListing'
import { ProductDetails } from './Pages/ProductDetails'

import Login from './Pages/Login'
import Register from './Pages/Register'
import CartPage from './Pages/Cart'
import Verify from './Pages/Verify'
import ForgotPassword from './Pages/ForgotPassword'
import MyAccount from './Pages/MyAccount'

import toast, { Toaster } from 'react-hot-toast';
import Checkout from './Pages/Checkout'
import MyList from './Pages/MyList'
import Orders from './Pages/Orders'
import { fetchDataFromApi, postData } from './utils/api'
import Address from './Pages/MyAccount/address'
import OrderSuccess from './Pages/Orders/success'
import OrderFailed from './Pages/Orders/failed'
import SearchPage from './Pages/Search'


const MyContext = createContext();

const ConditionalHeader = () => {
  const location = useLocation();
  // Hide on Landing Page ("/"), show everywhere else
  if (location.pathname === '/') return null;
  return <Header />;
};

const ConditionalFooter = () => {
  const location = useLocation();
  // Hide on Landing Page ("/"), show everywhere else
  if (location.pathname === '/') return null;
  return <Footer />;
};

function App() {

  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item: {}
  });
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [myListData, setMyListData] = useState([]);


  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [openAddressPanel, setOpenAddressPanel] = useState(false);

  const [addressMode, setAddressMode] = useState("add");
  const [addressId, setAddressId] = useState('');

  const [searchData, setSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openFilter, setOpenFilter] = useState(false);
  const [isFilterBtnShow, setIsFilterBtnShow] = useState(false);
  const [openSearchPanel, setOpenSearchPanel] = useState(false);

  const handleOpenProductDetailModel = (status, item) => {
    setOpenProductDetailsModal({
      open: status,
      item: item 
    });
  };
  
  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal({
      open: false,
      item: {} 
    });
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  }

  const toggleAddressPanel = (newOpen) => () => {
    if(newOpen == false){
      setAddressMode("add");
    }
    setOpenAddressPanel(newOpen);
  }

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");

    if(token !== undefined && token !== null && token !== ""){
      setIsLogin(true);

      getCartItems();
      getMyListData();
      getUserDetails();

    }else{
      setIsLogin(false);
    }
  }, [isLogin]);

  const getUserDetails = () => {
    fetchDataFromApi(`/api/user/user-details`).then((res) => {
      if (res?.response?.data?.error === true) {
        if (res?.response?.data?.message === "You have not login") {
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("refreshtoken");

          alertBox("error", "Session expired. Please login again.");

          window.location.href = "/login";

          setIsLogin(false);
          return;
        }
      }

      setUserData(res.data);

    }).catch((err) => {
      alertBox("error", err?.message || "Failed to fetch user details");
    })
  }

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if(res?.error === false) {
        setCatData(res?.categories);
      }
    })
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  const alertBox = (type, msg) => {
    if(type === "Success"){
      toast.success(msg)
    }
    if(type === "error"){
      toast.error(msg);
    }
  }

  const addToCart = (product, quantity) => {
    if(!isLogin){
      alertBox("error", "You are not logged in. Please login first");
      navigate("/login");
      return false;
    }

    const id = userData?._id;

    const data = {
      productTitle: product?.name,
      image: product?.image,
      rating: product?.rating,
      quantity: quantity,
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      subTotal: Math.round(product?.price * quantity * 100) / 100,
      countInStock: product?.countInStock,
      productId: product?._id,
      brand: product?.brand,
      size: product?.size,
      weight: product?.weight,
      ram: product?.ram
    }

    postData("/api/cart/add", data).then((res) => {
      if(res?.error !== false){
        alertBox("error", res?.message);
        return false;
      }
      alertBox("Success", res?.message);

      getCartItems();
      
    }).catch((error) => {
      alertBox("error", error?.message || "Failed to add to cart");
    })
    
  }

  const getCartItems = () => {
    fetchDataFromApi(`/api/cart/get`).then((res) => {
      if (res?.error === false) {
        setCartData(res?.data);
      }
    })
  }

  const getMyListData = () => {
    fetchDataFromApi(`/api/mylist/`).then((res) => {
      if (res?.error === false) {
        setMyListData(res?.data);
      }
    }).catch((error) => {
      alertBox("error", error?.message || "Failed to fetch wishlist items");
    })
  }

  const values = {
    openProductDetailsModal,
    setOpenProductDetailsModal,
    handleOpenProductDetailModel,
    handleCloseProductDetailsModal,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    setOpenAddressPanel,
    toggleAddressPanel,
    openAddressPanel,
    alertBox,
    isLogin,
    setIsLogin,
    setUserData,
    userData,
    setCatData, 
    catData,
    addToCart,
    cartData,
    setCartData,
    getCartItems,
    myListData,
    setMyListData,
    getMyListData,
    getUserDetails,
    addressMode,
    setAddressMode,
    addressId,
    setAddressId,
    searchData,
    setSearchData,
    searchQuery,
    setSearchQuery,
    windowWidth,
    setOpenFilter,
    openFilter,
    setIsFilterBtnShow,
    isFilterBtnShow,
    setOpenSearchPanel,
    openSearchPanel
  }

   return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          
          {/* This keeps your Header exactly where it was, but hides it on "/" */}
          <ConditionalHeader />

          <Routes>
            {/* Landing Page (Stands separated, no Header/Footer) */}
            <Route path="/" element={<HubLandingPage />} />

            {/* E-Commerce Pages (Will all show the Header/Footer) */}
            <Route path="/store" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/my-orders" element={<Orders />} />
            <Route path="/order/success" element={<OrderSuccess />} />
            <Route path="/order/failed" element={<OrderFailed />} />
            <Route path="/address" element={<Address />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>

          {/* This keeps your Footer exactly where it was, but hides it on "/" */}
          <ConditionalFooter />

        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />

    </>
  )
}

export default App;
export { MyContext };