const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require ("mongoose");

const app = express();
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/credenceDB",{useNewUrlParser: true});

const movieSchema = {
    name: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    summary: String
};

const Movie = mongoose.model("Movie", movieSchema);

const movie1 = new Movie ({
    name: "Harry Potter and the Order of the Phoenix",
    img: "https://bit.ly/2IcnSwz",
    summary: "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look toundermine Dumbledore's authority at Hogwarts and discredit Harry."
});

const movie2 = new Movie ({
    name: "The Lord of the Rings: The Fellowship of the Ring",
    img: "https://bit.ly/2IcnSwz",
    summary: "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed."
});

const movie3 = new Movie ({
    name: "Avengers: Endgame",
    img: "https://bit.ly/2IcnSwz",
    summary: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, theremaining Avengers -- Thor, Black Widow, Captain America, and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe."
});

const defaultMovies = [movie1,movie2,movie3];

Movie.insertMany(defaultMovies,function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Successfully inserted");
    }
});

app.get("/",function(req,res){
    res.send("We are on home")
});



app.listen(3000,function(){
    console.log("Server is running on port 3000");
});