'use strict';

const Controller = require('egg').Controller;
const {ResponseCode, SuccessResponseMaker, ResponseMaker} = require('./../util/response');

class UserController extends Controller {
    async add() {
        let ctx = this.ctx;
        let {name, account, password} = this.ctx.query;
        if(!name || !account || !password) {
            ctx.body = ResponseMaker(ResponseCode.Fail, null, "数据不完整");
            return;
        }

        const result = await ctx.service.user.add(ctx, {
            name,
            account,
            password
        });

        ctx.body = SuccessResponseMaker(result, "操作成功");
    }
}

module.exports = UserController;
