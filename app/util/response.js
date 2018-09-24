const ResponseCode = {
    Success: "0000",
    Fail: "0001",
};

exports.ResponseCode = ResponseCode;
exports.ResponseMaker = function(retCode, retData, retMsg) {
    return  {
        retCode,
        retData,
        retMsg
    };
}
exports.SuccessResponseMaker = function(retData, retMsg) {
    !retMsg && (retMsg = "操作成功");

    return {
        retCode: ResponseCode.Success,
        retData,
        retMsg
    };
}