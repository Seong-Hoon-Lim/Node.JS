/**
 * MongoDB 연결 테스트 코드
 */


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hooney200:hooney200@cluster0.155h4r3.mongodb.net/?retryWrites=true&w=majority";

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
        const adminDB = client.db('test').admin();  //admin DB 인스턴스
        const listDatabases = await adminDB.listDatabases();  //DB 정보 가져오기
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        console.log(listDatabases);
        return "OK"
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run()
    .then(console.log)
    .catch(console.error);
