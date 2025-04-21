import React, { useEffect, useState } from 'react'
import { API_PATH } from '../data/ApiPath';

const AllProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        productsHandler();
        console.log('this is useEffect')
    }, [])

    const productsHandler = async () => {
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_PATH}product/${firmId}/products`);
            const newProductsData = await response.json();
            setProducts(newProductsData.products);
            console.log(newProductsData)
        } catch (error) {
            console.error("Failed to fetch products : ", error);
            alert("Failed to fetch products")
        }
    }
    
    const deleteProductById = async (productId) => {
        try {
            const response = await fetch(`${API_PATH}product/${productId}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                setProducts(products.filter(product => product._id !== productId));
                confirm("are you sure, you want to delete?")
                alert("Product deleted Successfully")
            }
        } catch (error) {
            console.error('Failed to delete product');
            alert('Failed to delete product')
        }
    }


    return (
        <div>
            {products.length === 0 ? (
                <p>No prodcuts found</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item._id || item.id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img src={`${API_PATH}/uploads/${item.image}`}
                                            alt={item.productName}
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    )}
                                </td>
                                <td><button onClick={() => deleteProductById(item._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            )}
        </div>
    )
}

export default AllProducts
