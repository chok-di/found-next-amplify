/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
import { Client } from "pg";

 exports.handler = async (event) => {
     const client = new Client({
         host: process.env.RDS_HOSTNAME,
         port: process.env.RDS_PORT,
         user: process.env.RDS_USERNAME,
         password: process.env.RDS_PASSWORD,
         database: process.env.RDS_DB_NAME,
     });
 
     await client.connect();
 
     let res;
     try {
         res = await client.query('SELECT * FROM YourTable');
         console.log(res.rows);
     } catch (err) {
         console.error(err);
     } finally {
         await client.end();
     }
 
     const response = {
         statusCode: 200,
         body: JSON.stringify(res.rows),
     };
 
     return response;
 };