const Joi = require('joi')
const express = require('express')
const app = express()


app.use(express.json())

const courses = [
    {id:1, name: course1}, {id:2, name: course2}, {id:3, name: course3}
]

app.get('/', (req, res)=>{
    res.send("Hello There!")
})

app.get('/api/courses/', (req, res)=> {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404),send("Course with the given ID was not found")
    res.send(course)
})

app.post('/api/courses', (req, res)=>{
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema)
   // console.log(result);

    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses);

})

app.put('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404),send("Course with the given ID was not found")
    const { error } = validateCourse(req.body)

    if(error){
        res.status(400).send(result.error.details[0].message)
        return
    }
    course.name = req.body.name;
    res.send(course);

})
function validateCourse (course){
    
    const schema = {
        name: Joi.string().min(3).required()
    }
   
    return Joi.validate(req.body, schema)
}

const port = process.env.PORT || 3000

app.listen(port, ()=> console.log(`Listening on port ${port} ..`))
