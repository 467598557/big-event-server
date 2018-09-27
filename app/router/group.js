module.exports = app=> {
    const {router, controller} = app;
    const {group} = controller;

    router.get('/group/add', group.add);
    router.get('/group/delete', group.delete);
    router.get('/group/list', group.list);
    router.get('/group/update', group.update);
    router.get('/group/updateStatus', group.updateStatus);
}