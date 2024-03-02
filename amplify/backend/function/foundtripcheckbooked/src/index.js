/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}

 */

const { connectToDatabase } = require("/opt/nodejs/common");

exports.handler = async (params) => {
  const client = await connectToDatabase();
  await client.connect();

  try {
    const tripId = params.tripId;
    const email = params.email;
    const res = await client.query(
      `SELECT EXISTS
             (SELECT 1 FROM bookings
             WHERE trip_id = $1 and email = $2)`,
      [tripId, email],
    );
    const response = {
      statusCode: 200,
      body: res.rows[0].exists,
    };
    console.log(response);
    return response.body;
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};
