//only needs to export the controllers
const fs = require('fs');

//ler dados de forma sincrona no topo do arquivo
const event = JSON.parse(fs.readFileSync(`${__dirname}/./../data/event.json`));
const week = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
getQuery = (req,res) => {

    if (req.query.dayOfTheWeek){ //verify if it is a query
        const events = []; //to store the final result
        const dayWeek = req.query.dayOfTheWeek; //as day of the week
        for (let el of event){ //passing events that have the same date to a new array
            let temporary = new Date(el.dateTime);
            temporary = temporary.getUTCDay(); //returns 0 as sunday and 6 as saturday
            if (week[temporary] === dayWeek.toString().toLowerCase()){ //compares for every object of data/event.js
                events.push(el);
            }
        }
        return res.status(200).json({ //sending array of events
            status: "success",
            data:{
                weekDay: dayWeek,
                events: events
            }
        });
    }

}

exports.getAllEvents = (req, res) => {
   
    getQuery(req,res); //verify and get if there is a query

    res.status(200).json({
        status: "success",
        data: {
            event : event
        }
    });

};

exports.getEventById = (req, res) =>{
    const id = req.params.id;
    const eventById = event.find(ob => ob.id === id);
    
    res.status(200).json({ //sending an element by its ID
        status: "success",
        data: {
            event: eventById
        }
    });
    
}