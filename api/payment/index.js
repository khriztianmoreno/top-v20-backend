const { Router } = require('express');

const { handlerPayment } = require('./payment.controller');
const { isAuthenticated } = require('../../auth/auth.service');

const router = Router();

router.post('/', isAuthenticated(), handlerPayment);

module.exports = router;

// 1. paymentMethod Id -> en el cliente tengo esa info
// 2. Enviar al backend el paymentMethodId y el amount (descriptio, moneda, etc)
// 3. En el backend crear un customer o si ya esta, se busca previamente
// 4. Crear un paymentIntent (paymentMethodId, amount, currency, description, customerId)
// 5. En el backend crear un payment en nuestra DB (refId, description, value, currency, userId)
