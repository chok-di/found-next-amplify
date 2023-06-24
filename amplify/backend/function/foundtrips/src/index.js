/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 const {Client} = require("pg");

 exports.handler = async () => {
     const client = new Client({
         host: process.env.RDS_HOSTNAME,
         port: process.env.RDS_PORT,
         user: process.env.RDS_USERNAME,
         password: process.env.RDS_PASSWORD,
         database: process.env.RDS_DB_NAME,
     });
     await client.connect();
     try {
         const res = await client.query(
             `SELECT * FROM trips`
         );
             const response = {
         statusCode: 200,
         body: res.rows,
     };
     console.log(response);
     return response;
     } catch (err) {
         console.log(err.messages);
 
     } finally {
         await client.end();
     }
 };