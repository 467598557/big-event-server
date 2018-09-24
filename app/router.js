'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);
    router.get('/user/add', controller.user.add);
    router.get('/group/add', controller.group.add);
    router.get('/group/delete', controller.group.delete);
    router.get('/group/list', controller.group.list);
    router.get('/group/update', controller.group.update);
    router.get('/group/updateStatus', controller.group.updateStatus);
    router.get('/events/add', controller.events.add);
    router.get('/events/delete', controller.events.delete);
    router.get('/events/list', controller.events.list);
    router.get('/events/update', controller.events.update);
};
