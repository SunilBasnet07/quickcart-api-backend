import axios from "axios";

const KhaltiPayment = async (data) => {
    const { return_url, website_url, amount, purchase_order_id, purchase_order_name, customer_info } = data;

    if (!return_url) {
        throw {
            statusCode: 422,
            message: "Return Url is required."
        }

    }
    if (!website_url) {
        throw {
            statusCode: 422,
            message: "Website url is required."
        }
    }
    if (!amount) {
        throw {
            statusCode: 422,
            message: "Total amount is required."
        }
    }
    if (!purchase_order_id) {
        throw {
            statusCode: 422,
            message: "Order id is required."
        }
    }
    if (!purchase_order_name) {
        throw {
            statusCode: 422,
            message: "Order name is required."
        }
    }
    if (!customer_info) {
        throw {
            statusCode: 422,
            message: "Custometr info name is required."
        }
    }

 const response = await axios.post(`${process.env.KHALTI_URL}`,data, {
        headers: {
            Authorization: `Key ${process.env.KHALTI_API_KEY}`,
            "Content-Type": "application/json"
        }
    })
    return response.data;

}

export default KhaltiPayment;