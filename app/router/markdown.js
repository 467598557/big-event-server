module.exports = app=> {
    const {router, controller} = app;
    const {markdown} = controller;

    router.get('/event/get', markdown.get);
    router.post('/event/add', markdown.add);
    router.post('/event/update', markdown.update);
}