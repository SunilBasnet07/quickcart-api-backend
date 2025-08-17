import { CONFIRMED_STATUS, PENDING_STATUS } from "../constant/status.js";
import Order from "../models/Order.js"
import Payment from "../models/Payment.js";
import KhaltiPayment from "../utils/khalti.js";


const getAllOrders = async (query) => {
    const filter = {};
    if (query.status) filter.status = query.status || PENDING_STATUS;
    return await Order.find(filter).sort({ "createdAt": -1 }).populate("orderItem.product").
        populate("userId", ["name", "email", "address", "number"]);
}
const getOrdersByUser = async (userId, query) => {
    const filter = { userId: userId };

    if (query.status) {
        filter.status = query.status || PENDING_STATUS;
    }

   

    return await Order.find(filter)
        .sort({ createdAt: -1 })
        .populate("orderItem.product")
        .populate("userId", ["name", "email", "address", "number"]);
};

const createOrder = async (data) => {
    data.orderId = crypto.randomUUID();
    return await Order.create(data);
}

const getOrderById = async (id) => {
    const order = await Order.findById(id).populate("orderItem.product").
        populate("userId", ["name", "email", "address", "number"]);;
    if (!order) {
        throw {
            statusCode: 404,
            message: "Order not found"
        }
    }
    return order;
}
const deleteOrder = async (id) => {
     await Order.findByIdAndDelete(id);
    return {message:"Order Deleted successfull."};
}
const checkoutOrder = async (id, data) => {
    const order = await Order.findById(id).
        populate("userId", ["name", "email", "number"]);;
  
    if (!order) {
        throw {
            statusCode: 404,
            message: "Order not found"
        }
    }
    return await KhaltiPayment({
        // return_url: "https://ecommerce-project-o6w9.vercel.app/product",
        return_url: data?.return_url,
        website_url: data?.website_url,
        amount: order?.totalPrice*100 ,
        purchase_order_id: order?._id,
        purchase_order_name: order?.orderId,
        customer_info: {
            name: order.userId?.name,
            email: order.userId?.email,
            phone: order.userId?.number
        },
    })
}
const updateOrderByStatus = async (id, status) => {
    return await Order.findByIdAndUpdate(id, { status: status }, { new: true });
}

const confirmOrder = async (id, data) => {
    const order = await Order.findById(id);
    if (!order) {
        throw {
            statusCode: 404,
            message: "Order not found."
        }
    }
    const isPaymentSuccess= data.status == "completed"
    
   const response = await Payment.create({
       
        totalAmount:order?.totalPrice,
        paymentMethod:data.paymentMethod || "online",
        status:isPaymentSuccess? "completed": "failed",
        order:id,
        transactionId:data.transactionId,

    });
    const paymentMethod = response?.paymentMethod;
    if(!isPaymentSuccess){
        throw{
            statusCode:400,
            message:"Payment failed"
        }
    }
 return await Order.findByIdAndUpdate(id,{status:CONFIRMED_STATUS,paymentMethod:paymentMethod},{new:true})  

}


export default { getAllOrders, createOrder, getOrdersByUser, updateOrderByStatus, getOrderById, checkoutOrder,confirmOrder,deleteOrder }