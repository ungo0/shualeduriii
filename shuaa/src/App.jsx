import { useState } from 'react';
import './App.css';

function App() {
  const images = ["image-product-1.jpg", "image-product-2.jpg", "image-product-3.jpg", "image-product-4.jpg"];
  const [mainImg, setMainImg] = useState(images[0]);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [cont, setCont] = useState(1);
  const [cart, setCart] = useState([]);
  const [cartPopup, setCartPopup] = useState(false);

  const handleDelete = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const nextHandler = () => {
    if (count >= images.length - 1) {
      setCount(0);
      setMainImg(images[0]);
    } else {
      setCount(count + 1);
      setMainImg(images[count + 1]);
    }
  };

  const prevHandler = () => {
    if (count <= 0) {
      setCount(images.length - 1);
      setMainImg(images[images.length - 1]);
    } else {
      setCount(count - 1);
      setMainImg(images[count - 1]);
    }
  };

  const handleAddCart = () => {
    const cartInfo = {
      id: Date.now(),
      title: 'Fall Limited Edition Sneakers',
      desc: 'Low-profile sneakers',
      price: 125,
      total: 125 * cont,
    };


    setCart([cartInfo]);
    setCartPopup(true);
  };

  return (
    <>



      <div className="tavi">
        <h3>sneakers</h3>
        <nav>
          <ul>
            <li>Collections</li>
            <li>Men</li>
            <li>Women</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
        <div>
          <button className="cart-btn" onClick={() => setCartPopup(true)}>
            Cart ({cart.length})
          </button>
          <img src="image-avatar.png" alt="Avatar" className="avatar" />
        </div>
      </div>


      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((el) => (
            <div key={el.id}>
              <h2>{el.title}</h2>
              <h2>Price: ${el.price}</h2>
              <h2>Total: ${el.total}</h2>
              <button onClick={() => handleDelete(el.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>


      <div className="product-container">
        <div className="left-container">
          <img
            className="productImage__container"
            src={`/public/${mainImg}`}
            alt="Product"
            onClick={() => setShow(true)}
          />

          <div className="arro">
            {images.map((el, index) => (
              <img
                key={index}
                src={`/public/${el}`}
                className={`thumbnail ${mainImg === el ? "active" : ""}`}
                onClick={() => {
                  setSecondImg(el);
                  setCount(index);
                }}
              />
            ))}
          </div>
        </div>

        <div className="right-container">

          <div className="details">
            <span className="company-name">Sneaker Company</span>
            <h1 className="product-title">Fall Limited Edition Sneakers</h1>
            <p className="product-description">
              These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.
            </p>

            <div className="price">
              <h2>$125.00</h2>
              <span className="discount">50%</span>
              <p className="original-price">$250.00</p>
            </div>


            <div className="quantity-container">
              <button onClick={() => setCont(cont > 1 ? cont - 1 : cont)}> <img src="icon-minus.svg" alt="" /></button>
              <span>{cont}</span>
              <button onClick={() => setCont(cont + 1)}> <img src="icon-plus.svg" alt="" /></button>
            </div>


            <button className="add-to-cart-btn" onClick={handleAddCart}>
              <img src="icon-cart.svg" alt="cart" />
              add to cart
            </button>
          </div>
        </div>
      </div>


      {show && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="arrow" onClick={prevHandler}>
              <img src="icon-previous.svg" alt="Previous" />
            </button>
            <img src={`/public/${mainImg}`} alt="Product" className="main-image" />
            <button className="arrow" onClick={nextHandler}>
              <img src="icon-next.svg" alt="Next" />
            </button>
          </div>

          <div className="thumbnail-gallery">
            {images.map((el, index) => (
              <img
                key={index}
                src={`/public/${el}`}
                className={`thumbnail ${mainImg === el ? "active" : "blurred"}`}
                onClick={() => {
                  setSecondImg(el);
                 
                }}
                alt="Thumbnail"
              />
            ))}
          </div>

          <button className="close-modal" onClick={() => setShow(false)}>
            <img src="icon-close.svg" alt="" />
          </button>
        </div>
      )}
    </>
  );
}

export default App;
