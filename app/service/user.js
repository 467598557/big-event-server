const Service = require("egg").Service;
const uuidv1 = require('uuid/v1');

class UserService extends Service {
    async list(ctx) {
        const list = await ctx.model.User.find({});

        return list;
    }

    async find(ctx, obj) {
        let result = await ctx.model.User.findOne(obj);

        return result;
    }

    async add(ctx, obj) {
        obj.id = uuidv1();
        obj.updateTime = +new Date();
        let result = await ctx.model.User.create(obj);

        return result;
    }

    async update(ctx, obj) {
        const result = await ctx.model.User.update({id: obj.id}, obj,  {upsert : true});

        return result;
    }

    async delete(ctx, id) {
        const result = await ctx.model.User.deleteOne({id});

        return result;
    }
}

module.exports = UserService;