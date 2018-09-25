'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    app.sessionStore = {
        async get(key) {
            const res = await app.redis.get(key);
            if (!res) return null;
            return JSON.parse(res);
        },
        async set(key, value, maxAge) {
            // maxAge not present means session cookies
            // we can't exactly know the maxAge and just set an appropriate value like one day
            if (!maxAge) maxAge = 24 * 60 * 60 * 1000;
            value = JSON.stringify(value);
            await app.redis.set(key, value, 'PX', maxAge);
        },
        async destroy(key) {
            await app.redis.del(key);
        },
    };

    const {router, controller} = app;
    router.get('/', controller.home.index);
    router.get('/group/add', controller.group.add);
    router.get('/group/delete', controller.group.delete);
    router.get('/group/list', controller.group.list);
    router.get('/group/update', controller.group.update);
    router.get('/group/updateStatus', controller.group.updateStatus);
    router.get('/events/add', controller.events.add);
    router.get('/events/delete', controller.events.delete);
    router.get('/events/list', controller.events.list);
    router.get('/events/update', controller.events.update);
    router.get('/user/add', controller.user.add);
    router.get('/user/delete', controller.user.delete);
    router.get('/user/login', controller.user.login);
    router.get('/user/list', controller.user.list);
    router.get('/user/update', controller.user.update);
    router.get('/user/getUserInfo', controller.user.getUserInfo);
};
