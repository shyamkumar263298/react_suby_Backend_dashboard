import React, { useState } from 'react'
import { API_PATH } from '../../data/ApiPath';
import { data } from 'react-router-dom';



const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value])
    }
  }

  const handleBestSeller = (event) => {
    const value = event.target.value == 'true';
    setBestSeller(value);
  }

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage)
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      // if (!loginToken || !firmId) {
      //   console.error("User not authenticated");
      // }
      const firmId = localStorage.getItem('firmId')
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('description', description);
      formData.append('price', price);
      category.forEach((value) => {
        formData.append('category', value)
      });
      formData.append("image", image);
      console.log("form data product productName: ",(productName))

      console.log("form data product : ",JSON.stringify(formData))
      console.log("firmId : ",JSON.stringify(firmId))

      const response = await fetch(`${API_PATH}product/add-product/${firmId}`,
        {
          method: 'POST',
          body: formData
        }
      )
      const data = await response.json()
      if (response.ok) {
        alert('product added.');
        setBestSeller(false);
        setPrice('');
        setProductName('');
        setCategory([]);
        setDescription('');
        setImage(null);
      }
    } catch (error) {
      alert('failed to add product')

    }
  }

  return (
    <div className="firmSection">
      <form className='tableForm' onSubmit={handleAddProduct}>
        <h2>Add Product</h2>
        <label >Product Name</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <label >Price</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
            <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} />
            <label>Veg</label>
            </div>
            <div className="checkboxContainer">
            <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} />
            <label>Non-Veg</label>
            </div>
          </div>
        </div>
        <div className="checkInp">
          <label>Best Seller</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <input type="radio" value="true" checked={bestSeller === true}  onChange={handleBestSeller} />
              <label >Yes</label>
            </div>
            <div className="checkboxContainer">
              <input type="radio" value="false" checked={bestSeller === false} onChange={handleBestSeller} />
              <label >No</label>
            </div>
          </div>
        </div>
        <label >Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label >Firm Image</label>
        <input type="file" onChange={handleImageUpload}/>
        <br />
        <div className="btnSubmit">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
