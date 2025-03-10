import z from "zod"
export const signupInput = z.object({
	email: z.string().email(),
	password: z.string()
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
	email: z.string().email(),
	password: z.string()
})

export type SigninInput = z.infer<typeof signinInput>

export const createblogInput = z.object({
	title: z.string(),
	content: z.string(),
})

export type CreateBlogInput = z.infer<typeof createblogInput>

export const updateblogInput = z.object({
	title: z.string(),
	content: z.string(),
    id: z.number()
})

export type UpdateBlogInput = z.infer<typeof updateblogInput>