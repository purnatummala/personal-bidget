const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const BudgetModel = require("./model/budget");

const port=3000;


const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use("/", express.static("public"));

mongoose.connect("mongodb://localhost:27017/personal-budget", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected");
})
.catch((err) => {
    console.log(err);
    mongoose.connection.close();
});



app.use(express.json());

// Update the endpoints to use the existing "MyBudget" collection
app.get('/budget', function(req, res){
    BudgetModel.find()
      .then((val) => {
        res.send(val);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });
 });

// Update the endpoint to add new budget data to the existing "MyBudget" collection.
app.post('/budget', (req, res) => {
  mongoose.connect("mongodb://localhost:27017/personal-budget", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected");
    const newItem = new BudgetModel(req.body);
    BudgetModel.create(newItem) 
      .then((data) => {
        res.json(data);
        console.log(data);
        mongoose.connection.close();
      })
      .catch((connectionError) => {
        console.error(connectionError);
        res.status(400).json({error:'Internal error'})
      });
  })
  .catch((err) => {
    console.error(err);
    res.status(400).json({error:'Internal  error'})
  });
});


app.listen(port, () => {
  console.log(`listen on http://localhost:${port}`);

});
