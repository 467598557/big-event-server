const Service = require("egg").Service;
const uuidv1 = require('uuid/v1');

class MarkdownService extends Service {
    async update(ctx, obj) {
        const result = await ctx.model.Markdown.update({id: obj.id, user: obj.user}, obj, {upsert: true});

        return result;
    }

    async findById(ctx, id) {
        let result = await ctx.model.Markdown.findOne({id: id});

        return result;
    }

    async add(ctx, obj) {
        obj.id = uuidv1();
        obj.createTime = +new Date();
        let result = await ctx.model.Markdown.create(obj);

        return result;
    }
}

module.exports = MarkdownService;