import dotenv from 'dotenv';
dotenv.config();

//app
import app from './server';

// Database
import db from './src/db';

const port = process.env.HTTP_PORT || 3001;
const mongo_url = process.env.MONGO_URL || 'mongodb://localhost:27017/test'

async function start() {
    try {
        await db.mongo_db(mongo_url)
        app.listen(port, () => {
            console.log(`Server is listening to port: ${port}...`);
        })
    } catch(error) {
        console.log(`Server error: ${error}`)
    }
}

if (process.env.ENVIRONMENT !== 'test') {
    start();
}