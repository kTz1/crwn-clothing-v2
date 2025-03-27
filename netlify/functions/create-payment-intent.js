require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    console.log("Event body:", event.body);

    const { amount } = JSON.parse(event.body);

    if (!amount || typeof amount !== "number" || amount <= 0) {
      throw new Error(
        "Invalid amount provided. Amount must be a positive integer."
      );
    }

    console.log(`Creating payment intent for amount: ${amount}`);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log(`Payment intent created: ${paymentIntent.id}`);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.error("Error creating payment intent:", error.message, error.stack);

    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
