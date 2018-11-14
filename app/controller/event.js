'use strict';

const Controller = require('egg').Controller;
const {SuccessResponseMaker, ResponseCode, ResponseMaker} = require('./../util/response');

class EventController extends Controller {
    async list() {
        let ctx = this.ctx;
        let {user} = ctx.query;
        let eventList = await ctx.service.event.list(ctx, user);

        ctx.body = SuccessResponseMaker(eventList, "请求成功");
    }

    async listByGroups() {
        let ctx = this.ctx;
        let {groups} = ctx.query;

        groups = JSON.parse(groups);
        let eventList = [];
        let securityCommon = ctx.app.config.groups.Security.Common;
        await new Promise((resolve)=> {
            let lastIndex = groups.length - 1;
            groups.forEach(async (groupId, index)=> {
                let groupResult = await ctx.service.group.getById(ctx, groupId);
                if(groupResult && groupResult.security == securityCommon) {
                    let eventResult = await ctx.service.event.listByGroup(ctx, groupResult.id);
                    eventList = eventList.concat(eventResult);
                }

                if(index == lastIndex) {
                    resolve(eventList);
                }
            });
        });

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

    async updateMarkdown() {
        let ctx = this.ctx;
        let {markdown, id} = ctx.request.body;
        if(!markdown || !id) {
            ctx.body = ResponseMaker(ResponseCode.Fail, null, "数据不完整");
            return;
        }

        let curUser = ctx.session.user;
        await ctx.service.event.update(ctx, {
            id: id,
            user: curUser.id,
            markdown: markdown
        })

        ctx.body = SuccessResponseMaker(true, "操作成功");
    }
}

module.exports = EventController;
