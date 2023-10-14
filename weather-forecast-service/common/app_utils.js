var debug = require('debug')('api:common:utils:app');

exports.SendResponse = function (status, body) {
  var response = {
    headers: {
      "Content-Type": "application/json"
    },
    statusCode: status,
    body: JSON.stringify(body),

  };
  return response;
};

exports.format_headers_body = function (_reqheaders, _reqbody) {
  return new Promise((resolve, reject) => {
    var authParams;


    debug('App Details : ', authParams);
    return resolve({ headers: _reqheaders, body: _reqbody, authParams });
  })
}

exports.authValidate = function (req, res, next) {
  debug("Headers Authorization:", req.headers);
  var _token = req.headers.authorization;
  if(_token){
    var token_auth = _token.substring(7)
    debug("Token :", token_auth)
  }
  next();
 
}