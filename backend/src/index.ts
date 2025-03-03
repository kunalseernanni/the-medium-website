import { Hono } from 'hono'
import {userRouter} from './routes/user'
import {blogRouter} from './routes/blog'

// Create the main Hono app
const app = new Hono<{ 
  Bindings: 
  { DATABASE_URL: string,
    JWT_SECRET: string,
   }
   
}>();


app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

// app.use('/api/v1/blog/*', async (c, next) => {
//   //get the header
//   //verify the geader
//   //if the header is correct, we need can proceed
//   //if not , we return 403

//   const header = c.req.header('Authorization') || "";
//   //Bearer token => ["Bearer", "token"]
//   const token = header.split(" ")[1];
//   if(!header){
//     c.status(401);
//     return c.json({ error: "unauthorized" });
//   }
//   const response = await verify(header, c.env.JWT_SECRET);

//   if(response.id){
//     next()
//   }
//   else{
//     c.status(403);
//     return c.json({ error: "unauthorized" });
//   }

// })


app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})



export default app
