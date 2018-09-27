'use strict';
const fs = require('fs');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const RouterBaseFolder = "router";

    fs.readdir('./app/router', function (err, files) {
        (files || []).forEach((file)=> {
            require(`./${RouterBaseFolder}/${file.replace(".js", "")}`)(app);
        });
    });
}
