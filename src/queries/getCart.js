import axios from "@/lib/axios";

const getCart = async (user) => {
    const id = user.queryKey[1]
    const req = await axios('http://localhost:8000/api/cart', { params: { user: id } })
    return req.data
};

export default getCart;