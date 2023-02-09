//only needs to export the controllers
const fs = require('fs');

//ler dados de forma sincrona no topo do arquivo
const event = JSON.parse(fs.readFileSync(`${__dirname}/./../data/event.json`));
const week = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

translateQuerry = (req,res) => { //function to translate the dateTime of the elements into a weekDay and return an array of the events listed on that weekDay

    const events = [];   //to store the final result
    const dayOfTheWeek = req.query.dayOfTheWeek; //as day of the week

    for (let el of event){  //passing events that have the same date to a new array
        let temporary = new Date(el.dateTime);
        temporary = temporary.getUTCDay(); //returns 0 as sunday and 6 as saturday
        
        if (week[temporary] === dayOfTheWeek.toString().toLowerCase()){ //compares for every object of data/event.json
            events.push(el);
        }

    }
    return events;

};

getEventsOnWeekDay = (req,res) => {

    if (req.query.dayOfTheWeek) //verify if it has a query
    { 
        const eventsOnWeekDay = translateQuerry(req,res);

        return res.status(200).json({ //sending array of events
            status: "success",
            data:{
                weekDay: req.query.dayOfTheWeek,
                events: eventsOnWeekDay
            }
        });
    }

};



exports.getAllEvents = (req, res) => {
   
    getEventsOnWeekDay(req,res); //verify and get events if there is a query

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

exports.createEvent = (req, res)=>{
    const newEvent = Object.assign(req.body);
    event.push(newEvent);
    fs.writeFile(`${__dirname}/./../data/event.json`, JSON.stringify(event), (err)=>{
        res.status(201).json({
            status:'success',
            data : {
                newEvent
            }
        });
    });
};

exports.deleteEventById = (req,res)=>{
    const excluded = event.find(el=> el.id === req.params.id);
    for (el in event){
        if (event[el].id===req.params.id){
            event.splice(el,1);
        }
    }
    fs.writeFile(`${__dirname}/./../data/event.json`, JSON.stringify(event), (err)=>{
        res.status(500).json({
        status: "success",
        dataExcluded: excluded,
        data:{
            event: event
            }
        });
    });
    
};

exports.deleteEventsFromWeekday = (req, res) =>{

    const eventsOnWeekDay = translateQuerry
    
};