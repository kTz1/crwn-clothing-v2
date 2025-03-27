/* eslint-disable no-undef */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  try {
    const { amount } = JSON.parse(event.body);

    console.log(`Creating payment intent for amount: ${amount}`);

    // Create a payment intent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log(`Payment intent created: ${paymentIntent.id}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
}
