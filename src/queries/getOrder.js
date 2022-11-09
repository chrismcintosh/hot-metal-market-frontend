import axios from "../lib/axios";

const getOrders = async (order) => {
    const req = await axios(`/api/orders/${order.queryKey[1]}`)
    return req.data
};

export default getOrders;