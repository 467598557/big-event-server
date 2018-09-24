module.exports = app=> {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const EventSchema = new Schema({
        id: {type: String},
        text: {type: String},
        group: {type: String},
        user: {type: String},
        type: {type: Number}, // 1->事件,2->任务
        status: {type: Number}, // 1->未开始,2->进行中,3->已完成
        createTime: {type: Number},
        priority: {type: Number}, // 1->普通,2->低，3->中，4->高
    });

    return mongoose.model('Event', EventSchema);
}