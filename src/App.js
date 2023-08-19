import { useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { IsLoadingContext } from './contexts/IsLoadingContextProvider';
import { useRecoverDataCartFromLocalStorage } from './hooks/useRecoverDataCartFromLocalStorage';
import { Home } from './pages/home/Home';
import { Collection } from './pages/collections/Collection';
import { NavBar } from './components/nav/NavBar';
import { ProductDetailsContainer } from './pages/products/ProductDetailsContainer';
import { Cart } from './pages/cart/Cart';
import { AboutUs } from './pages/aboutUs/AboutUs';
import { ContactUs } from './pages/contactUs/ContactUs';
import { Footer } from './components/footer/Footer';
import { CustomOrder } from './pages/customOrder/CustomOrder';
import { OrderCreated } from './components/orderCreated/OrderCreated';
import { MercadoPagoTutorial } from './pages/mercadoPagoTutorial/MercadoPagoTutorial';
import './App.css';

function App() {  
  const { isLoading } = useContext(IsLoadingContext) 
  const { recoverCartDataFromLocalStorage } = useRecoverDataCartFromLocalStorage()
    
  useEffect(()=>{        
    recoverCartDataFromLocalStorage()    
  },[])  

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="*"                                         element = {<Navigate to="/home" />}/>
        <Route path="/home"                                     element = {<Home />}/>
        <Route path="/collections/Urban backpacks"              element = {<Collection key="UrbanBackpacks"/>}/>
        <Route path="/collections/Travel backpacks"             element = {<Collection key="TravelBackpacks"/>}/>
        <Route path="/collections/Climbing backpacks"           element = {<Collection key="ClimbingBackpacks"/>}/>
        <Route path="/collections/New arrivals - Backpacks"     element = {<Collection key="NewArrivalsCollection"/>}/>              
        <Route path="/aboutUs"                                  element = {<AboutUs />}/>
        <Route path="/contactUs"                                element = {<ContactUs />}/>
        <Route path="/products/:idCollection/:idProduct"        element = {<ProductDetailsContainer />}/>
        <Route path="/cart"                                     element = {<Cart />}/>
        <Route path="/customOrder"                              element = {<CustomOrder />}/>
        <Route path="/orderCreated/:orderId"                    element = {<OrderCreated />}/>        
        <Route path="/mercadoPagoTutorial"                      element = {<MercadoPagoTutorial />}/>
      </Routes>
      {!isLoading && <Footer />}
    </>   
  );
}
 
export default App;


// No cierra el menu ante cambio de paginas y clickeo afuera del area. chequear
// Hacer full responsive home y colecciones
// Analizar hacer custom hooks para home, collection y navBar
// bajar el footer en cart y contactUs para que quede fuera de vista
// Tamaño del menu, separacion entre secciones


// acomodar product, custom order, spinner
   