module.exports = app=> {
    const {router, controller} = app;
    const {user} = controller;

    router.get('/user/add', user.add);
    router.get('/user/delete', user.delete);
    router.get('/user/login', user.login);
    router.get('/user/list', user.list);
    router.get('/user/update', user.update);
    router.get('/user/getUserInfo', user.getUserInfo);
    router.get('/user/logout', user.logout);
    router.get('/user/updatePassword', user.updatePassword);
    router.post('/user/init', user.init);
    router.get('/user/getInitStatus', user.getInitStatus);
}