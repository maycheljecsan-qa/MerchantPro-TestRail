const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

const EMAIL = "maychel.hutahaean@youtap.com";
const API_KEY = "J.L.fIZBeWpiFubdEEAS-zzn5lLZjUI3KGccwADJb";

app.get("/api/run", async (req, res) => {

    try{

        const response = await axios.get(
            "https://youtap.testrail.io/index.php?/api/v2/get_run/782",
            {
                auth:{
                    username:EMAIL,
                    password:API_KEY
                }
            }
        );

        res.json(response.data);

    }catch(e){

        res.status(500).json(e.response.data);

    }

});

app.listen(3000,()=>{
    console.log("Running...");
});