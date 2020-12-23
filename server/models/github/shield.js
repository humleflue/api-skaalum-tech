class Shield {
  constructor(label, message, color, labelColor, isError, namedLogo,
    logoSvg, logoColor, logoWidth, logoPosition, style, cacheSeconds) {
    this.schemaVersion = 1;

    this.label = `${label}`;
    this.message = `${message}`;
    this.color = color ? `${color}` : undefined;
    this.labelColor = labelColor ? `${labelColor}` : undefined;
    this.isError = isError ? `${isError}` : undefined;
    this.namedLogo = namedLogo ? `${namedLogo}` : undefined;
    this.logoSvg = logoSvg ? `${logoSvg}` : undefined;
    this.logoColor = logoColor ? `${logoColor}` : undefined;
    this.logoWidth = logoWidth ? `${logoWidth}` : undefined;
    this.logoPosition = logoPosition ? `${logoPosition}` : undefined;
    this.style = style ? `${style}` : undefined;
    this.cacheSeconds = cacheSeconds ? `${cacheSeconds}` : undefined;
  }
}

module.exports = Shield;
