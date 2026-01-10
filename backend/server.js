const express =require("express");
const cors = require ("cors");
const sequelize =require("./config/db");
const todoroutes =require("./routes/todoroutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/todos",todoroutes);

sequelize.sync().then(()=>{
    app.listen(3000,() => {
        console.log("server running on port 3000");
    });
});

