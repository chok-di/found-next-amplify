/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}

 */

const { connectToDatabase } = require("/opt/nodejs/common");

exports.handler = async (params) => {
  const client = await connectToDatabase();
  await client.connect();

  try {
    const res = await client.query(`SELECT * FROM bookings`);
    const response = {
      statusCode: 200,
      body: res.rows,
    };
    return response;
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};
