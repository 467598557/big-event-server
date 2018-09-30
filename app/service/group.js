const Service = require("egg").Service;
const uuidv1 = require('uuid/v1');

class GroupService extends Service {
    async list(ctx, user) {
        const list = await ctx.model.Group.find({user: user}).sort({updateTime: -1});

        return list;
    }

    async getById(ctx, id) {
        const list = await ctx.model.Group.findOne({id: id});

        return list;
    }

    async count(ctx) {
        const count = await ctx.model.Group.count({});

        return count;
    }

    async update(ctx, obj) {
        const result = await ctx.model.Group.update({id: obj.id, user: obj.user}, obj,  {upsert : true});

        return result;
    }

    async delete(ctx, user, id) {
        const result = await ctx.model.Group.deleteOne({id, user});

        return result;
    }

    async add(ctx, obj) {
        obj.id = uuidv1();
        let result = await ctx.model.Group.create(obj);

        return result;
    }
}

module.exports = GroupService;