module.exports = app=> {
    const {router, controller} = app;
    const {markdown} = controller;

    router.get('/markdown/get', markdown.get);
    router.post('/markdown/add', markdown.add);
    router.post('/markdown/update', markdown.update);
}