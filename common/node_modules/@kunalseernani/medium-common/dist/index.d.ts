import z from 'zod';
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export declare const createblogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    authorId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    authorId: number;
}, {
    title: string;
    content: string;
    authorId: number;
}>;
export type CreateBlogInput = z.infer<typeof createblogInput>;
export declare const updateblogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: number;
}, {
    title: string;
    content: string;
    id: number;
}>;
export type UpdateBlogInput = z.infer<typeof updateblogInput>;
