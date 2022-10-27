const getProducts = async () => {
    const sample = await fetch('http://localhost:8000/api/products')
    const products = await sample.json();
    return products
};

export default getProducts;