'use strict';

const Controller = require('egg').Controller;
const {ResponseCode, SuccessResponseMaker, ResponseMaker} = require('./../util/response');

module.exports = app=> {
    class UserController extends Controller {
        async list() {
            let ctx = this.ctx;
            let userList = await ctx.service.user.list(ctx);
            let user = ctx.session.user;
            let filterUserList = [];
            userList.forEach((_user)=> {
                if(_user.type <= user.type) {
                    filterUserList.push(_user);
                }
            });

            ctx.body = SuccessResponseMaker(filterUserList, "请求成功");
        }

        async getUserInfo() {
            let ctx = this.ctx;
            let user = ctx.session.user;
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

        async updatePassword() {
            let ctx = this.ctx;
            let {oldPassword, newPassword, rePassword} = this.ctx.query;
            if(!oldPassword || !newPassword || !rePassword || (newPassword != rePassword)) {
                ctx.body = ResponseMaker(ResponseCode.Fail, null, "数据不完整");
                return;
            }

            let user = ctx.session.user;
            if(user.password != oldPassword) {
                ctx.body = ResponseMaker(ResponseCode.Fail, null, "当前密码输入错误");
                return;
            }

            await ctx.service.user.update(ctx, {
                id: user.id,
                password: newPassword
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

            ctx.session.user = user;
            ctx.body = SuccessResponseMaker(user, "登录成功");
        }

        async logout() {
            let ctx = this.ctx;

            ctx.session.user = null;
            ctx.body = SuccessResponseMaker(true, "登出成功");
        }

        async init() {
            let ctx = this.ctx;
            let user = await ctx.service.user.find(ctx, {
                name: "admin"
            });

            if(user) {
                ctx.body = ResponseMaker(ResponseCode.Fail, null, "已经初始化过");
                return;
            }

            const result = await ctx.service.user.add(ctx, {
                name: "admin",
                password: "123456",
                type: 3
            });

            ctx.body = SuccessResponseMaker(result, "您可使用账号:admin,密码:123456进行登录。请尽快更改密码。");
        }

        async getInitStatus() {
            let ctx = this.ctx;
            let user = await ctx.service.user.find(ctx, {
                name: "admin"
            });

            ctx.body = SuccessResponseMaker(!!user, user ? "已经初始化过" : "未初始化");
        }
    }

    return UserController;
};
