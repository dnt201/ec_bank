import './App.css';

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import HomePage from './pages/HomePage'
import ListCategoryPage from './pages/ListCategoryPage';
import LoginPage from './pages/LoginPage'
import DetailCartPage from './pages/DetailCardPage';
import RegisterPage from './pages/RegisterPage'
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import Log from './pages/Log';

import GoToTop from './components/goToTop/GoToTop';
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import SomeThingWentWrong from './components/somethingwentWrong/SomeThingWentWrong';




import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getAllCard } from './actions/cardActions'
import Card from './components/card/Card';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCard());
  }, [])

  const allCard = useSelector((state) => state.allCard);
  var listCard = allCard.listCard;

  return (
    <>
      <Router>
        <Navbar />

        <Routes >
          <Route path="/" exact element={<HomePage />} />

          {listCard && listCard.map((card) => (
            <React.Fragment key={card.name}>
              <Route key={card.name} path={"/" + card.path} element={<ListCategoryPage type={card.path} title={card.name} category={card.children} />} />
              {card.children && card.children.map((cardChild) => (
                <Route key={cardChild._id} path={"/" + card.path + "/" + cardChild.name.replace(/[ ]/g, "%20")} element={<DetailCartPage type={card.path} category={cardChild} />} />
              ))}
            </React.Fragment>
          ))}

          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/user" exact element={<UserPage />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="/admin" exact element={<AdminPage />} />
          <Route path="/my-log" exact element={<Log />} />
          <Route path="/about" exact element={<SomeThingWentWrong/>}/>
          {/* <Route path="/test" exact element={<Test />} /> */}
          {/* <Route path="/card123" exact element={<Card />} />
          <Route path="/naptien" exact element={<FormNap />} /> */}
        </Routes>

        <Footer />
        <GoToTop />

      </Router>
    </>

  );
}

export default App;
