/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { connectToDatabase } = require("/opt/nodejs/common");

exports.handler = async (params) => {
  const client = await connectToDatabase();
  await client.connect();
  try {
    const email = params.email;
    const tripId = params.tripId;
    const result_booking = await client.query(
      `INSERT INTO bookings (email,trip_id)
                VALUES($1, $2)
                RETURNING *;`,
      [email, tripId],
    );
    const reduced_spot = await client.query(
      `UPDATE trips
                SET available_spots = available_spots - 1
                WHERE id = $1
                RETURNING *;`,
      [tripId],
    );
    return {
      statusCode: 200,
      body: "booking completed!",
    };
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};
