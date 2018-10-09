module.exports = app=> {
    const {router, controller} = app;
    const {event} = controller;

    router.get('/event/add', event.add);
    router.get('/event/delete', event.delete);
    router.get('/event/list', event.list);
    router.get('/event/update', event.update);
    router.post('/event/updateIndex', event.updateIndex);
}