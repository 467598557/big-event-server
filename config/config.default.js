'use strict';

module.exports = appInfo => {
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1537487184903_3529';

    config.middleware = [
        "loginfilter"
    ];

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

    config.groups = {
        Security: {
            Self: 1,
            Common: 2
        }
    };

    config.mongoose = {
        client: {
            // url: 'mongodb://root:root123456@127.0.0.1:27017/bigevent',
            url: 'mongodb://dyl:dyl123@192.168.50.62:27017/dyldb',
            options: {}
        }
    };

    config.redis = {
    };

    return config;
};
