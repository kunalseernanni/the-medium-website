import z from 'zod'
export const signupInput = z.object({
	email: z.string().email(),
	password: z.string()
})

export type SignupInput = z.infer<typeof signupInput>

export const createblogInput = z.object({
	title: z.string(),
	content: z.string(),
    authorId: z.number()
})

export type CreateBlogInput = z.infer<typeof createblogInput>

export const updateblogInput = z.object({
	title: z.string(),
	content: z.string(),
    id: z.number()
})

export type UpdateBlogInput = z.infer<typeof updateblogInput>