"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createContext: ()=>createContext,
    router: ()=>router,
    middleware: ()=>middleware,
    publicProcedure: ()=>publicProcedure,
    appRouter: ()=>appRouter
});
const _server = require("@trpc/server");
const _client = require("@prisma/client");
const _routes = require("./routes/index");
const prisma = new _client.PrismaClient();
const createContext = ({ req , res  })=>({
        req,
        res,
        prisma
    });
const t = _server.initTRPC.context().create();
const router = t.router;
const middleware = t.router;
const publicProcedure = t.procedure;
const appRouter = router({
    user: _routes.newsletterRouter
});
