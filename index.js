var url   = require('url');
var util  = require('./util');

module.exports = function(email, options) {
  /**
   * Gravatar contructor
   * @constructor
   * @param {String} email   Default email
   * @param {Object} options Default options
   */
  function Gravatar(email, options) {
    this.email      = '';
    this.hash       = '';
    this.options    = {
      default     : 404,
      requireType : false,
      size        : 200
    };
    this.rootPath   = 'gravatar.com';

    this.setEmail(email);
  }

  Gravatar.prototype.getEmail   = getEmail;
  Gravatar.prototype.setEmail   = setEmail;
  Gravatar.prototype.getOptions = getOptions;
  Gravatar.prototype.setOptions = setOptions;
  Gravatar.prototype.getAvatar  = getAvatar;

  /**
   * Get initialized email
   * @memberOf Gravatar
   * @return {String} Initialized email
   * @example
   *   gravatar.getEmail();
   */
  function getEmail() {
    return this.email;
  }

  /**
   * Set new email into contructor
   * @memberOf Gravatar
   * @param {Sring} email New email
   * @example
   *   gravatar.setEmail('hoangmy92@gmail.com');
   */
  function setEmail(email) {
    this.email = util.parseEmail(email);
    this.hash  = util.createHash(this.email);
  }

  /**
   * Get initialized options
   * @memberOf Gravatar
   * @return {Object} List of initialized options
   * @example
   *   gravatar.getOptions();
   */
  function getOptions() {
    return this.options;
  }

  /**
   * Set new options into contructor
   * @memberOf Gravatar
   * @param {String|Object}         key   Option's key or set of options
   * @param {String|Boolean|Number} value Option's value
   * @example
   *   gravatar.setOptions('size', 400);
   *   gravatar.setOptions({
   *     size  : 300,
   *     secure: true
   *   });
   */
  function setOptions(key, value) {
    if (typeof key === 'string') {
      this.options[key] = value;
    } else if (typeof key === 'object') {
      for (var k in key) {
        key.hasOwnProperty(k) && this.setOptions(k, key[k]);
      }
    }
  }

  /**
   * Get avatar by email
   * @memberOf Gravatar
   * @param  {Object} options Custom options
   * @return {String}         Avatar link
   * @example
   *   gravatar.getAvatar();  // Get avatar by default settings
   *   gravatar.getAvatar({
   *     secure: true
   *   });                    // Get avatar by secure link - https
   */
  function getAvatar(options) {
    var ops  = this.options;
    var path = this.rootPath;

    // Get avatar by custom options
    if (typeof options === 'object') {
      for (var key in options) {
        options.hasOwnProperty(key) && (ops[key] = options[key]);
      }
    }

    path = url.resolve(
        url.resolve(
          ((ops['secure'] === true) ? 'https://secure.' : 'http://www.') + path,
          'avatar/1'
        ), this.hash
      ) + ((ops['requireType'] === true) ? '.jpg?' : '?') +
      ((typeof ops['size'] === 'number') ? ('s=' + ops['size']) : '') + '&' +
      ((typeof ops['default'] === 'string') ? ('d=' + encodeURIComponent(ops['default'])) : '');

    return path;
  }

  return new Gravatar(email, options);
};
