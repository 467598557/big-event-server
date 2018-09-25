'use strict';

const Controller = require('egg').Controller;
const {ResponseCode, SuccessResponseMaker, ResponseMaker} = require('./../util/response');

class UserController extends Controller {
    async list() {
        let ctx = this.ctx;
        let eventsList = await ctx.service.user.list(ctx);

        ctx.body = SuccessResponseMaker(eventsList, "请求成功");
    }

    async getUserInfo() {
        let ctx = this.ctx;
        let app = this.app;
        let user = await app.sessionStore.get("user");
        console.log("get user info", user);
        ctx.body = SuccessResponseMaker(user, "请求成功");
    }

    async add() {
        let ctx = this.ctx;
        let {name, password, type} = this.ctx.query;
        if(!name || !password || !type) {
            ctx.body = ResponseMaker(ResponseCode.Fail, null, "数据不完整");
            return;
        }

        const result = await ctx.service.user.add(ctx, {
            name,
            password,
            type
        });

        ctx.body = SuccessResponseMaker(result, "操作成功");
    }

    async update() {
        let ctx = this.ctx;
        let {name, password, type, id} = this.ctx.query;
        if(!name || !password || !type || !id) {
            ctx.body = ResponseMaker(ResponseCode.Fail, null, "数据不完整");
            return;
        }

        await ctx.service.user.update(ctx, {
            id,
            name,
            password,
            type
        });

        ctx.body = SuccessResponseMaker(true, "操作成功");
    }

    async delete() {
        let ctx = this.ctx;
        let {id} = ctx.query;
        await ctx.service.user.delete(ctx, id);

        ctx.body = SuccessResponseMaker(true, "操作成功");
    }

    async login() {
        let ctx = this.ctx;
        let {name, password} = ctx.query;

        let user = await ctx.service.user.find(ctx, {
            name,
            password
        });

        if(!user) {
            ctx.body = ResponseMaker(ResponseCode.Fail, null, "登录名或者密码错误");
            return;
        }

        let app = this.app;
        await app.sessionStore.set(user, user);
        console.log("set user info", user);
        ctx.body = SuccessResponseMaker(user, "登录成功");
    }
}

module.exports = UserController;
