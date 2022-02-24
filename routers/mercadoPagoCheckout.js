import express, { response } from 'express';
import mercadopago from 'mercadopago';

const mercadoPagoCheckoutRouter = express.Router();
const mp = mercadopago

mercadoPagoCheckoutRouter.post('/create_preference', (req, res) => {
    let preference = {
        items: req.body.items,
        back_urls: {
            "success": "http://localhost:3000/order-completed",
            "failure": "http://localhost:3000/payment",
            "pending": "http://localhost:3000/payment",
        },
        auto_return: "approved",
        payment_methods: {
            excluded_payment_methods: [
                {id: "pec"}
            ]
        },
        shipments: {
            cost: req.body.freight,
            mode: "not_specified"
        }
    };

    mp.preferences.create(preference)
        .then(response => {
            res.json({id: response.body.id})
        }).catch(error => {
            res.send({message: error.message})
        })
});

mercadoPagoCheckoutRouter.get("/feedback", (req, res) => {
    res.json({
        Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id,
        PaymentMethod: req.query.payment_type
    })
});

export default mercadoPagoCheckoutRouter;