'use strict';

const Controller = require('egg').Controller;
const {SuccessResponseMaker, ResponseCode, ResponseMaker} = require('./../util/response');

class MarkdownController extends Controller {
    async add() {
        let ctx = this.ctx;
        let {text, user, event} = this.ctx.request.body;
        if(!text || !user || !event) {
            ctx.body = ResponseMaker(ResponseCode.Fail, false, "参数不完整");
            return;
        }

        let result = await ctx.service.markdown.add(ctx, {
            text,
            user,
            event
        });

        ctx.body = SuccessResponseMaker(result);
    }

    async update() {
        let ctx = this.ctx;
        let {text, user, id} = ctx.request.body;
        if(!text || !user || !id) {
            ctx.body = ResponseMaker(ResponseCode.Fail, null, "数据不完整");
            return;
        }

        await ctx.service.markdown.update(ctx, {
            id,
            text,
            user
        });

        ctx.body = SuccessResponseMaker(true, "操作成功");
    }

    async get() {
        let ctx = this.ctx;
        let {id} = ctx.query;

        let markdown = await ctx.service.markdown.findById(ctx, id);

        ctx.body = SuccessResponseMaker(markdown, "操作成功");
    }
}

module.exports = MarkdownController;
