import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import productService from '../services/product.service';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function Favorites() {
  const [product, setProduct] = useState([]);
  const [searchProducts, setSearchProducts] = useState(null);
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [search, setSearch] = useState('');

  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const storedToken = localStorage.getItem('authToken');
  console.log(searchProducts);

  const addFavorite = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/user/${user._id}`
    );
    console.log(response.data);
    setSearchProducts(response.data.favorite);
    setProduct(response.data.favorite);
  };

  useEffect(() => {
    addFavorite();
  }, [user]);

  const deleteFavorite = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/favorites/${searchProducts._id}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    deleteFavorite();
  }, []);

  console.log('this is the products', product);

  return (
    <div>
      <br />

      {product.length > 0 &&
        product.map((product) => {
          return (
            <div className="favoriteProducts">
              <Card
                className="product-card"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  alignContent: 'center',
                  width: '60vw',
                  margin: 'auto',
                  borderRadius: '15px',
                }}
              >
                <Card.Img
                  variant="left"
                  src={product.img}
                  alt="product img"
                  className="allProductsImg"
                  style={{
                    border: 'solid black 2px',
                    borderRadius: '15px',
                    marginLeft: '0px',
                    width: '25vw',
                    height: '30vh',
                  }}
                />

                <Card.Body>
                  <Card.Title>
                    <h3>{product.name}</h3>
                    <hr style={{ width: '20vw' }} />
                  </Card.Title>
                  <Card.Text>
                    Price: {product.price} €
                    <br />
                    <br />
                    Category: {product.category}
                    <br />
                    Condition: {product.condition}
                    <br />
                    <br />
                    Description: {product.description}
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default Favorites;
