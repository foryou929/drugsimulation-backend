const stripe = require("stripe")(process.env.PRIVATE_API_KEY);

exports.pay = async (req, res) => {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
    });

    res.json({ message: null, client_secret: paymentIntent.client_secret });
}