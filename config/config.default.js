'use strict';

module.exports = appInfo => {
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1537487184903_3529';

    config.middleware = [];

    config.security = {
        methodnoallow: {
            enable: false
        },
        domainWhiteList: [ '*' ]
    };

    config.events = {
        pageSize: 10
    };

    config.mongoose = {
        client: {
            url: 'mongodb://127.0.0.1:27017/bigevent',
            options: {}
        }
    };

    return config;
};
