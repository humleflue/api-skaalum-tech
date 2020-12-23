// Documentation at https://shields.io/

/**
 * Add two numbers together
 * @param  {String} label Required. The left text, or the empty string to omit the left side of the badge. This can be overridden by the query string.
 * @param  {String} message Required. Can't be empty. The right text.
 * @param  {String} color Default: lightgrey. The right color. Supports the eight named colors above, as well as hex, rgb, rgba, hsl, hsla and css named colors. This can be overridden by the query string.
 * @param  {String} labelColor Default: grey. The left color. This can be overridden by the query string.
 * @param  {String} isError Default: false. true to treat this as an error badge. This prevents the user from overriding the color. In the future it may affect cache behavior.
 * @param  {String} namedLogo Default: none. One of the named logos supported by Shields or simple-icons. Can be overridden by the query string.
 * @param  {String} logoSvg Default: none. An SVG string containing a custom logo.
 * @param  {String} logoColor Default: none. Same meaning as the query string. Can be overridden by the query string. Only works for named logos.
 * @param  {String} logoWidth Default: none. Same meaning as the query string. Can be overridden by the query string.
 * @param  {String} logoPosition Default: none. Same meaning as the query string. Can be overridden by the query string.
 * @param  {String} style Default: flat. The default template to use. Can be overridden by the query string.
 * @param  {String} cacheSeconds Default: 300, min 300. Set the HTTP cache lifetime in seconds, which should be respected by the Shields' CDN and downstream users. Values below 300 will be ignored. This lets you tune performance and traffic vs. responsiveness. The value you specify can be overridden by the user via the query string, but only to a longer value.
 */
class Shield {
  constructor(label, message, color, labelColor, isError, namedLogo,
    logoSvg, logoColor, logoWidth, logoPosition, style, cacheSeconds) {
    this.schemaVersion = 1;

    this.label = label;
    this.message = message;
    this.color = color;
    this.labelColor = labelColor;
    this.isError = isError;
    this.namedLogo = namedLogo;
    this.logoSvg = logoSvg;
    this.logoColor = logoColor;
    this.logoWidth = logoWidth;
    this.logoPosition = logoPosition;
    this.style = style || `for-the-badge`;
    this.cacheSeconds = cacheSeconds;
  }
}

module.exports = Shield;
