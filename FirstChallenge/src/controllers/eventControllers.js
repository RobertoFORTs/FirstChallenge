//only needs to export the controllers
const fs = require('fs');

//ler dados de forma sincrona no topo do arquivo
const event = JSON.parse(fs.readFileSync(`${__dirname}/./../data/event.json`));
exports.getAllEvents = (req, res) => {

    res.status(200).json({
        status: "success",
        data: {
            event : event
        }
    });

};