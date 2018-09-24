const Service = require("egg").Service;
const uuidv1 = require('uuid/v1');

class UserService extends Service {
    async find(ctx, obj) {
        let result = await ctx.model.User.find(obj);

        return result;
    }

    async add(ctx, obj) {
        obj.id = uuidv1();
        obj.updateTime = +new Date();
        let result = await ctx.model.User.create(obj);

        return result;
    }
}

module.exports = UserService;