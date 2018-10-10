module.exports = (options)=> {
    return async function loginfilter(ctx, next) {
        let {user} = ctx.session;
        let isLoginRequest = ctx.request.url.indexOf("/user/login") > -1;
        let isInitRequest = ctx.request.url.indexOf("/user/init") > -1 || ctx.request.url.indexOf("/user/getInitStatus") > -1;
        if((!isLoginRequest && !isInitRequest) && !user ) {
            ctx.body = {
                retCode: "9304",
                retMsg: "未登陆"
            };

            return;
        }

        await next();
    }
}