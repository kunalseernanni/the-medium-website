import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'


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

app.post('/api/v1/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt:token });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

app.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	
  const user = await prisma.user.findUnique({
    where:{
      email: body.email
    }
  });
	
  if (!user){
    c.status(403);
    return c.json({ error: "user not found" });
  }
  const token = await sign({id: user.id}, c.env.JWT_SECRET);
  return c.json({
    jwt: token,
    message: "success"
  })
})

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
