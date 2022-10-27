import axios from "@/lib/axios";

const getCart = async (user) => {
    const req = await axios('http://localhost:8000/api/cart', { params: { user: user.id } })
    console.log("in here")
    console.log(req)
    return req.data
};

export default getCart;