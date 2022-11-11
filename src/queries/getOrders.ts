import axios from "../lib/axios";

const getOrders = async (user) => {
    const id = user.queryKey[1]
    const req = await axios('/api/orders', { params: { user: id } })
    return req.data
};

export default getOrders;