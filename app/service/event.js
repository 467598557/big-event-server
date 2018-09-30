const Service = require("egg").Service;
const uuidv1 = require('uuid/v1');

class EventsService extends Service {
    async list(ctx, user) {
        const list = await ctx.model.Event.find({user});

        return list;
    }

    async listByGroup(ctx, group) {
        const list = await ctx.model.Event.find({group});

        return list;
    }

    async count(ctx, user) {
        const count = await ctx.model.Event.count({user});

        return count;
    }

    async update(ctx, obj) {
        const result = await ctx.model.Event.update({id: obj.id, user: obj.user}, obj,  {upsert : true});

        return result;
    }

    async findById(ctx, id) {
        let result = await ctx.model.Event.find({id: id});

        return result;
    }

    async add(ctx, obj) {
        obj.id = uuidv1();
        obj.createTime = +new Date();
        let result = await ctx.model.Event.create(obj);

        return result;
    }

    async delete(ctx, user, id) {
        const result = await ctx.model.Event.deleteOne({id, user});

        return result;
    }

    async deleteAll(ctx, user, group) {
        const result = await ctx.model.Event.deleteMany({group, user});

        return result;
    }
}

module.exports = EventsService;