export default function handler(req,res){

  const {method} = req;
  
  switch (method) {
    case 'GET':
      // Handle GET request
      res.status(200).json({ user: 'John Doe' });
      break;
    case 'POST':
      // Handle POST request
      // Extract JSON data from the request body
      console.log(req);
      const { name } = req.body;
      res.status(200).json({ message: `Hello, ${name}!` });
      break;
    default:
      // Handle other HTTP methods
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}