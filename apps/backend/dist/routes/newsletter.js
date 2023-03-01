"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _trpc = require("../trpc");
const _zod = require("zod");
const newsletterRouter = (0, _trpc.router)({
    create: _trpc.publicProcedure// input validation using zod
    .input(_zod.z.object({
        email: _zod.z.string()
    })).mutation(async ({ input , ctx  })=>{
        // mutate values on db using prisma
        // prisma to mutate data in backend
        return await ctx.prisma.newsletter.create({
            data: {
                email: input.email
            }
        });
    })
});
const _default = newsletterRouter;
