"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _server = require("@trpc/server");
const t = _server.initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;
const appRouter = router({});
