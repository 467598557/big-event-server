module.exports = app=> {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        id: {type: String},
        name: {type: String},
        account: {type: String},
        password: {type: String},
        updateTime: {type: Number}
    });

    return mongoose.model('User', UserSchema);
}