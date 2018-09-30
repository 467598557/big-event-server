'use strict';

const Controller = require('egg').Controller;
const {ResponseCode, SuccessResponseMaker, ResponseMaker} = require('./../util/response');

class GroupController extends Controller {
    async list() {
        let ctx = this.ctx;
        let {user} = this.ctx.query;
        if(!user) {
            ctx.body = ResponseMaker(ResponseCode.Fail, null, "数据不完整");
            return;
        }

        let loginUser = ctx.session.user;
        let groupList = await ctx.service.group.list(ctx, user);
        if(user != loginUser.id) {
            groupList = groupList.filter((group)=> {
                return group.security == ctx.app.config.groups.Security.Common;
            });
        }

        ctx.body = SuccessResponseMaker(groupList, "操作成功");
    }

    async add() {
        let ctx = this.ctx;
        let {text, priority, security, user} = this.ctx.query;
        if(!text || !priority || !security || !user) {
            ctx.body = ResponseMaker(ResponseCode.Fail, null, "数据不完整");
            return;
        }

        const result = await ctx.service.group.add(ctx, {
            user,
            text,
            priority,
            security,
            status: 1 // 展开
        });

        ctx.body = SuccessResponseMaker(result, "操作成功");
    }

    async delete() {
        let ctx = this.ctx;
        let {user, id} = ctx.query;
        await ctx.service.group.delete(ctx, user, id);
        await ctx.service.event.deleteAll(ctx, user, id);

        ctx.body = SuccessResponseMaker(true, "操作成功");
    }

    async update() {
        let ctx = this.ctx;
        let {text, priority, security, user, id} = this.ctx.query;
        if(!text || !priority || !security || !user || !id) {
            ctx.body = ResponseMaker(ResponseCode.Fail, null, "数据不完整");
            return;
        }

        await ctx.service.group.update(ctx, {
            id,
            text,
            priority,
            security,
            user
        });

        ctx.body = SuccessResponseMaker(true, "操作成功");
    }

    async updateStatus() {
        let ctx = this.ctx;
        let {status, user, id} = this.ctx.query;
        if(!status || !user || !id) {
            ctx.body = ResponseMaker(ResponseCode.Fail, null, "数据不完整");
            return;
        }

        await ctx.service.group.update(ctx, {
            id,
            status,
            user
        });

        ctx.body = SuccessResponseMaker(true, "操作成功");
    }
}

module.exports = GroupController;
