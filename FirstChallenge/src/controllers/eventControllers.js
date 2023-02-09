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


exports.checkBodyEvent = (req,res,next) =>{
    if (!req.body.description ||!req.body.dateTime || !req.body.createdAt){
        return res.status(400).json({
            status: "failed",
            message: "missing information"
        });
    }
    next();
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

exports.createEvent = (req, res)=>{ //got to add a way of generating random ids
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
    //getting the array of events to be excluded
    const eventsOnWeekDay = translateQuerry(req,res);

    //find those events on original file
    const filteredArray = event.filter((el) => {
            
            if (!eventsOnWeekDay.find((obj) => obj === el)) //if the returned value in the find function is undefined, then we should filter that element to get the events that are not part of the weekDay
            {
                return el;
            };

        });

    //writing file
    fs.writeFile(`${__dirname}/./../data/event.json`, JSON.stringify(filteredArray), (err)=>{
        res.status(500).json({
            status: "success",
            dataExcluded: eventsOnWeekDay,
            data:{
                event: filteredArray
                }
         });
    });

};