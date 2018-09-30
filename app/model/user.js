module.exports = app=> {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        id: {type: String},
        name: {type: String},
        password: {type: String},
        updateTime: {type: Number},
        type: {type: Number}
    });

    return mongoose.model('User', UserSchema);
}