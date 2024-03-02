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
    const result_cancel = await client.query(
      `DELETE FROM bookings
            WHERE email = $1 and trip_id = $2
            RETURNING *;`,
      [email, tripId],
    );
    const increased_spot = await client.query(
      `UPDATE trips
                SET available_spots = available_spots + 1
                WHERE id = $1
                RETURNING *;`,
      [tripId],
    );
    return {
      statusCode: 200,
      body: "cancellation completed!",
    };
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};
