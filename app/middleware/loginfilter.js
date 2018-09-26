module.exports = (options)=> {
    return async function loginfilter(ctx, next) {
        let {user} = ctx.session;
        let isLoginRequest = ctx.request.url.indexOf("/login") > 0;
        if(!isLoginRequest && !user) {
            ctx.body = {
                retCode: "9304",
                retMsg: "未登陆"
            };

            return;
        }

        await next();
    }
}