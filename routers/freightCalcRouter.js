import express from "express";
import axios from "axios"

const freightCalcRouter = express.Router();

freightCalcRouter.post('/', async (req, res) => {
    const origin = req.body.origin
    const destination = req.body.destination

    function formatedCep(cep) {
        let string = cep;
        string = string.split('')
        string.splice(5, 0, '-')
        string = string.toString()
        string = string.replace(/,/g, '')

        return string
    }

    const formatedOrigin = formatedCep(origin)
    const formatedDestination = formatedCep(destination)

    const {data} = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${formatedOrigin}&destinations=${formatedDestination}&key=${process.env.API_KEY}`)
    const {elements} = data.rows[0]
    const {distance} = elements[0]

    const freightTax = distance.value / 10000 * 6

    const payload = {
        distance,
        freightTax: freightTax,
    }

    res.send(payload)
})

export default freightCalcRouter;