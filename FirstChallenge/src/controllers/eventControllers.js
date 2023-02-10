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
        let dayIndex = temporary.getUTCDay(); //returns 0 as sunday and 6 as saturday
        let currentDate = new Date();
        
        //has to verify if it is on the week
        if (week[dayIndex] === dayOfTheWeek.toString().toLowerCase() && temporary.getTime() >= currentDate.getTime() && temporary.getFullYear() === currentDate.getFullYear() && temporary.getMonth() === currentDate.getMonth() && temporary.getDate() - currentDate.getDate() < 7){ //gets the objects in that dayOfWeek
            events.push(el);
        }
    };
    return events;
}

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

exports.checkId= (req, res, next) => {
    if (req.params.id*1 > event.length){
        res.status(404).json({
            status: 'failed',
            message: 'id could not be found (invalid id)'
        });
    }
    next();
};


exports.checkBodyEvent = (req,res,next) =>{ //Later: add some validation for dateTime and createdAt
                                            //should be always bigger than current date
    if (!req.body.description ||!req.body.dateTime || !req.body.createdAt){
        return res.status(400).json({
            status: "failed",
            message: "missing information"
        });
    }
    else if(req.body.description.length <= 2 ){ //minimum message size
        return res.status(400).json({
            status: "failed",
            message: "information filled incorrectly"
        })
    }
    next();
};


exports.getAllEvents = (req, res) => {
   
    getEventsOnWeekDay(req,res); //verify and get events if there is a query, probably transform this to a middleware

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
    const newID = (event[event.length - 1].id * 1) + 1;

    const newEvent = Object.assign({id: `${newID}`}, req.body);
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
    const excluded = event.find(el => el.id === req.params.id);
    for (let el in event){
        if (event[el].id===req.params.id){
            event.splice(el,1);
        } 
    }

    fs.writeFile(`${__dirname}/./../data/event.json`, JSON.stringify(event), ()=>{});
    
    res.status(500).json({
    status: "success",
    dataExcluded: excluded,
    data:{
        event: event
        }
    });
    
};

exports.deleteEventsFromWeekday = (req, res) =>{ //since this function also uses translateQuerry, it will also only delete the events from the weekday of the currentWeek
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