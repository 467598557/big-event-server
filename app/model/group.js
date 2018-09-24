module.exports = app=> {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const GroupSchema = new Schema({
        id: {type: String},
        text: {type: String},
        user: {type: String},
        priority: {type: Number},
        security: {type: Number},
        updateTime: {type: Number},
        status: {type: Number}, //1->展开，2->缩起
    });

    return mongoose.model('Group', GroupSchema);
}