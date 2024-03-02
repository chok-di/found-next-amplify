/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}

 */

const { connectToDatabase } = require("/opt/nodejs/common");

exports.handler = async () => {
  const client = await connectToDatabase();
  await client.connect();

  try {
    const res = await client.query(`SELECT * FROM trips`);
    const response = {
      statusCode: 200,
      body: res.rows,
    };
    return response;
  } catch (err) {
    console.log(err.messages);
  } finally {
    await client.end();
  }
};
