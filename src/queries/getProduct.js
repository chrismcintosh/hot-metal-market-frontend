import axios from "@/lib/axios";

const getProduct = async (id) => {
    const req = await axios(`/api/products/${id}`)
    return req.data
};

export default getProduct;