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
    this.style = style;
    this.cacheSeconds = cacheSeconds;
  }
}

module.exports = Shield;
