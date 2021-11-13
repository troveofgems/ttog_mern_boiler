const {APP_PROD_MODE} = require("../../constants/process.constants");
module.exports.buildAPIBodyResponse = callSignature => {
  const IS_NOT_PRODUCTION = process.env.NODE_ENV !== APP_PROD_MODE;
  let baseObject = {
    success: null,
    error: null,
    data: {}
  }

  if (IS_NOT_PRODUCTION) {
    baseObject.callSignature = callSignature;
  }

  return baseObject;
};