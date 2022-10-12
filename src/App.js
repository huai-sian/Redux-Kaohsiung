import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals, getCartItems, getTourData } from './features/cart/cartSlice';
import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import Modal from './components/Modal';
import Selector from './components/Selector';
import Hotrank from './components/Hotrank';
import Cards from './components/Cards';
import Loading from './components/Loading';

import './App.css';

const Footer = styled.footer`
  position:relative;
  width:100%;
  height:auto;
  background-color:#8A82CC;
  color:white;
  bottom:0;
  text-align:center;
  clear:both;
  padding:1rem 0;
  p:nth-of-type(1) {
    margin-bottom:10px;
  }
`;

const Gotop = styled.div`
  position:fixed;
  right:1.2rem;
  bottom:1.5rem;
  width:2rem;
  height:2rem;
  background-color:#8A82CC;
  cursor:pointer;
  z-index:2;
  transition: all .5s;

  & > i{
    line-height:2rem;
    font-size:1.3rem;
    text-indent:0.2rem;
    color:white;
  }
`;

const Header = styled.header`
  & h1 {
    padding-top:30px;
    text-align:center;
    color: white;
    font-size:3rem;
    margin:0;
    letter-spacing:2px;   
  }
`;

const IconDown = styled.div`
  background:#ffff url(http://i.imgur.com/fYLc1at.png) center no-repeat;
  align-content: center;
  position: relative; 
  top:-28px;
  margin: 0 auto;
  border-radius: 50px;
  border: 1px solid #559AC8;
  height: 24px;
  width: 24px;
`


function App() {
  const [selected, setSelected] = useState('');
  const { isOpen } = useSelector((store) => store.modal);
  const { cartItems, total, amount, tourData, filterData, isLoading } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const elementTop = useRef();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  window.addEventListener('scroll', function() {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      if(elementTop.current) {
        elementTop.current.style.opacity = '1'
      }
       
    } 
    else if (scrolled <= 300){
      if(elementTop.current) {
        elementTop.current.style.opacity = '0'
      }
    }
  });


  const handleSelect = (val) => {
    setSelected(val)
  }

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems('random'));
  }, []);

  useEffect(() => {
    dispatch(getTourData(''));
  }, []);

  useEffect(() => {
    dispatch(getTourData(selected));
  }, [selected]);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {/* {isOpen && <Modal />}
      <Navbar />
      <CartContainer /> */}
      <Header>
        <div className="bg-img"></div>
        <h1>高雄旅遊資訊</h1>
        <Selector data={tourData} handleSelect={handleSelect} selected={selected}></Selector>
      </Header>
      <Hotrank handleSelect={handleSelect}></Hotrank>
      <div className="container">
        <div className="hr-padding">
          <hr/>
          <IconDown></IconDown>
        </div>
        <h2 className="title">{selected}</h2>
        <Cards data={filterData} selected={selected}></Cards>
      </div>
      <Gotop className="gotop" onClick={scrollTop} ref={elementTop}>
        <i className="fa fa-angle-double-up"></i>
      </Gotop>
      <Footer>
        <p>高雄旅遊網</p>
        <p>資料來源：高雄市政府</p>
      </Footer>
    </main>
  );
}
export default App;
