var crypto = require('crypto');

module.exports = (function(crypto) {
  function Util() {
    //
  }

  Util.prototype.validEmail = validEmail;
  Util.prototype.createHash = createHash;
  Util.prototype.parseEmail = parseEmail;

  /**
   * Validate email
   * @memberOf Util
   * @param  {String} email Email address
   * @return {Boolean}      Valid email address
   */
  function validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function parseEmail(email) {
    if (typeof email === 'string') {
      email = email.trim().toLowerCase();
      return this.validEmail(email) ? email : '';
    }

    return '';
  }

  /**
   * Create an MD5 hash
   * @memberOf Util
   * @param  {String} email A lowercase email
   * @return {String}       A MD5 hash
   */
  function createHash(email) {
    return crypto.createHash('md5')
      .update(email)
      .digest('hex');
  }

  return new Util();
}(crypto));
