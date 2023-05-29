const express = require('express');

const app = express()

const port = process.env.PORT || 5000

const cors = require("cors")


app.use(cors()) // here is the middlewair for the serving the apis and the access for the server



app.use(express.json()) // here is the json converting method

require("dotenv").config() // here is the env config


// here is connect with the mongodb



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASS}@cluster0.onk7lrw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // here is the DBs 

        const DB1 = client.db("Items").collection("itemsInfo")

        const DB3 = client.db("orderinfos").collection("order")

        const DB2 = client.db("sininData").collection("singInInfos")

        // here is the DBs ends



        // here is server req and responses

        // here is the cursor for the items

        app.get("/items", async (req, res) => {
            const cursor = DB1.find()

            const result = await cursor.toArray()
            
            res.send(result)
        })

        // here is the cursor for the items ends







        // here is server req and responses ends



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



// here is connect with the mongodb ends







// here is the server opining response

app.get("/", (req, res) => {
    res.send("server is running ")
})

// here is the listining the port 

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

// basic res ends here