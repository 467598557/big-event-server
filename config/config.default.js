'use strict';

module.exports = appInfo => {
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1537487184903_3529';

    config.middleware = [];

    config.cors = {
        enable: true,
        package: 'egg-cors',
        origin: 'http://localhost:8080',
        credentials: true
    };

    config.events = {
        pageSize: 10
    };

    config.users = {
        Type: {
            User: 1,
            Manager: 2,
            Admin: 3
        }
    };

    config.mongoose = {
        client: {
            url: 'mongodb://127.0.0.1:27017/bigevent',
            options: {}
        }
    };

    config.redis = {
    };

    return config;
};
