import axios from "axios";

const generateGeminiAi = async (product) => {
    const key = process.env.GEMINI_API_KEY;
    const GeminiUrl = process.env.GEMINI_API_URL;
    try {

        const response = await axios.post(`${GeminiUrl}?key=${key}`, {
            "contents": [
                {
                    "parts": [
                        {
                            "text": `Give me only 250 words  to enerate a compelling product description 
                                     for the following item. Highlight its key features, 
                                     benefits, and ideal use cases while maintaining an engaging and 
                                      persuasive tone. Ensure the description is clear, informative, 
                                      and optimized for e-commerce. 
                                      Product name: ${product.name}, Brand: ${product.brand}, Category: ${product.category}`,
                        }
                    ]
                }
            ]
        })
        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.log(error?.message);
    }


}

export default generateGeminiAi