module.exports = app=> {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const MarkdownSchema = new Schema({
        id: {type: String},
        text: {type: String},
        event: {type: String},
        user: {type: String},
        createTime: {type: Number}
    });

    return mongoose.model('Markdown', MarkdownSchema);
}