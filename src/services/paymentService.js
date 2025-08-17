import Payment from "../models/Payment"

const createPayment=async(data)=>{
return await Payment.create(data);
}

const updatePayment =async(id,data)=>{
  return await Payment.findByIdAndUpdate(id,data,{new:true})
}

export default {createPayment,updatePayment}