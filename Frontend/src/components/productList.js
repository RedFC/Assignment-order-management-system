import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASEURL = process.env.REACT_APP_API_URL;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, image: '' });
    const [Users, setUsers] = useState([]);
    const [User, setUser] = useState([]);
    const [orderDate, setOrderDate] = useState('');
    let [qty, setQty] = useState(0);

    useEffect(() => {
        
        const fetchProducts = async () => {
            const result = await axios.get(BASEURL + '/products');
            setProducts(result.data);
        };

        const fetchUsers = async () => {
            const result = await axios.get(BASEURL + '/users');
            setUsers(result.data);
        };

        fetchProducts();
        fetchUsers();
    }, []);

    const handleCreateProduct = async () => {
        await axios.post(BASEURL + '/products', newProduct);
        setNewProduct({ name: '', description: '', price: 0, image: '' });
        const result = await axios.get(BASEURL + '/products');
        setProducts(result.data);
    };

    const handlePlaceOrder = async (productId, name, price, qty) => {
        console.log(productId);
        
        const orderData = {
            item: name,
            price: price,
            qty: qty,
            userId: User,
            itemId: productId,
            created_at: orderDate || new Date().toISOString(),
        };
        await axios.post(BASEURL + '/orders', orderData);
        setQty(0);
    };

    const handleSelectChange = (event) => {
        setUser(parseFloat(event.target.value));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Product Management</h1>

            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Create a New Product</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="border p-2 rounded"
                    />
                </div>
                <button
                    onClick={handleCreateProduct}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Create Product
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Order Date</h2>
                    <input
                        type="datetime-local"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Select User Profile</h2>
                    <select id="countries" value={User}
                        onChange={handleSelectChange} className="border border-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 ">
                        <option >Choose a profile</option>
                        {Users.map((user) => (
                            <option value={user.id} key={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-6">Available Products</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <li key={product.id} className="border rounded-lg p-4 shadow-md">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-40 w-full object-cover mb-4 rounded"
                            />
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-gray-700 mb-2">{product.description}</p>
                            <p className="text-gray-800 font-semibold mb-4">${product.price}</p>
                            <div className="flex items-center mb-4">
                                <input
                                    type="number"
                                    placeholder="Qty"
                                    onChange={(e) => setQty(parseFloat(e.target.value))}
                                    className="border p-2 rounded w-20"
                                />
                            </div>
                            <button
                                onClick={() => handlePlaceOrder(product.id, product.name, product.price, qty,)}
                                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition w-full"
                            >
                                Purchase
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductList;
