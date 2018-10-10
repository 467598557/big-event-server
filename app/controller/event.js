'use strict';

const Controller = require('egg').Controller;
const {SuccessResponseMaker, ResponseCode, ResponseMaker} = require('./../util/response');

class EventsController extends Controller {
    async list() {
        let ctx = this.ctx;
        let {user} = ctx.query;
        let eventList = await ctx.service.event.list(ctx, user);

        ctx.body = SuccessResponseMaker(eventList, "请求成功");
    }

    async add() {
        let ctx = this.ctx;
        let {text, user, group} = this.ctx.query;
        if(!text || !user || !group) {
            ctx.body = ResponseMaker(ResponseCode.Fail, false, "参数不完整");
            return;
        }

        let result = await ctx.service.event.add(ctx, {
            text,
            user,
            group,
            type: 1, // 事件
            status: 1, // 未开始
            priority: 1
        });

        ctx.body = SuccessResponseMaker(result);
    }

    async delete() {
        let ctx = this.ctx;
        let {user, id} = ctx.query;
        await ctx.service.event.delete(ctx, user, id);

        ctx.body = SuccessResponseMaker(true, "操作成功");
    }

    async update() {
        let ctx = this.ctx;
        let {text, user, id, status, type, priority} = ctx.query;
        if(!text || !user || !id) {
            ctx.body = ResponseMaker(ResponseCode.Fail, null, "数据不完整");
            return;
        }

        await ctx.service.event.update(ctx, {
            id,
            text,
            user,
            status,
            type,
            priority
        });

        ctx.body = SuccessResponseMaker(true, "操作成功");
    }

    async updateIndex() {
        let ctx = this.ctx;
        let {data} = ctx.request.body;
        if(!data || !data.length) {
            ctx.body = ResponseMaker(ResponseCode.Fail, null, "数据不完整");
            return;
        }

        let curUser = ctx.session.user;
        data.forEach(async (item)=> {
            await ctx.service.event.update(ctx, {
                id: item.id,
                user: curUser.id,
                index: item.index
            })
        });

        ctx.body = SuccessResponseMaker(true, "操作成功");
    }
}

module.exports = EventsController;
