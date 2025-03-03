import {Hono} from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify } from 'hono/jwt'


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables : {
		userid: string,
        blogid: string
	}
}>();

blogRouter.use("/*", async (c, next) => {
    const header = c.req.header("Authorization") || "";
    if (!header) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    const token = header.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if (!user) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    c.set("userid", user.id);
    await next();
});

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const authorId = c.get("userid");
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        },
    })
	return c.json({
        id: authorId
    })
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where:{
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
	return c.json({
        id: blog.id
    })
})

blogRouter.get('/user/:id', async(c) => {
    const id = await c.req.param("id");
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

    try{
        const blog = await prisma.post.findMany({
            where:{
                authorId: Number(id)
            }
        })
        return c.json({
            id: blog
        })
    }catch(e){
        c.status(411)
        return c.json({
            error: e
        })
    }
})
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({})
	return c.json({
        blogs
    })
})