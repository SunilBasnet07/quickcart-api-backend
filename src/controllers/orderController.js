import orderService from "../services/orderService.js"

const getAllOrders = async (req, res) => {
    const query = req.query;
    try {
        const orders = await orderService.getAllOrders(query);
        res.json(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const getOrdersByUser = async (req, res) => {
    const user = req.user;
      const query = req.query;
    try {
        const orders = await orderService.getOrdersByUser(user?.id,query);
        res.json(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const createOrder = async (req, res) => {
    const user = req.user;
    const input = req.body;
    try {
      
        // if(!input.name) return res.status(422).send("Name is required")
        // if(!input.number) return res.status(422).send("Name is required")
        if(!input.orderItem || input.orderItem?.length==0) return res.status(422).send("Order item is required.")
        if(!input.orderItem[0]?.product) return res.status(422).send("Product is required.")
        if(!input.totalPrice) return res.status(422).send("Total price is required.");
        if(!input.totalPrice) return res.status(422).send("Total price is required.");
        if(!input.userId) input.userId= user.id;
        if(!input.shippingAddress){
            if(!user.address) return res.status(422).send("Shipping Address is required.");
            input.shippingAddress= user.address
        }
        const order = await orderService.createOrder(input);
        res.json(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const getOrderById = async (req, res) => {
    const id = req.params.id;
 try {
        const order = await orderService.getOrderById(id);
        res.json(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const deleteOrder = async (req, res) => {
    const id = req.params.id;
 try {
        const order = await orderService.deleteOrder(id);
        res.json(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const updateOrdersByStatus = async (req, res) => {
    const id = req.params.id;
    const status= req.body.status;

   
    try {
        await orderService.getOrderById(id);
        if(!status) return res.status(422).send("Status is required.")
        const updateOrderStatus = await orderService.updateOrderByStatus(id,status);
        res.json(updateOrderStatus);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const checkoutOrder = async (req, res) => {
    const id = req.params.id;
    const data= req.body;
try {
         const checkoutOrder = await orderService.checkoutOrder(id,data);
        res.json(checkoutOrder);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const confirmOrder = async (req, res) => {
    const id = req.params.id;
    const input= req.body;

   
    try {
         if(!input.status) return res.status(422).send("Confirm order status is required.")
        const confirmedOrder = await orderService.confirmOrder(id,input);
        res.json(confirmedOrder);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { getAllOrders,createOrder,getOrdersByUser,updateOrdersByStatus ,getOrderById,checkoutOrder,confirmOrder,deleteOrder}