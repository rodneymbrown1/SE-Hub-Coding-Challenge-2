class Contrast_V2 {

constructor () {
  this.contrastRatio;
  this.foreground
  this.background
  this.hexColor="#ffffff";
}
//----------------------------------------------------------------------   
    increaseBrightness(_color, _factor) {
  // Convert the color to HSL
  var hslColor = this.hexToHSL(_color);

  // Increment the lightness value
  hslColor[2] += _factor;

  // Ensure the lightness value is within the valid range (0 to 100)
  hslColor[2] = Math.min(99, hslColor[2]);

  // Convert back to hex color
  return this.hslToHex(hslColor);
  }
//----------------------------------------------------------------------
    decreaseBrightness(_color, _factor) {
    // Convert the color to HSL
    const hslColor = this.hexToHSL(_color);
  
    // Decrement the lightness value
  
    hslColor[2] -= _factor;
    // Ensure the lightness value is within the valid range (1 to 99)
    hslColor[2] = Math.max(1, hslColor[2]);
  
    // Convert back to hex color
    return this.hslToHex(hslColor);
  }
//---------------------------------------------------------------------- 
// Helper function to convert HEX to HSL
   hexToHSL(_hex) {
    var hex = _hex
    // console.log("hex: "+ hex)
    hex = hex.replace(/^#/, "");
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    
    const l = (max + min) / 2;
  
    let h, s;
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
  
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }
//---------------------------------------------------------------------- 
// Helper function to convert HSL to HEX
  hslToHex([h, s, l]) {
    h /= 360;
    s /= 100;
    l /= 100;
  
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
  
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
  
    const toHex = (x) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
  
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
//----------------------------------------------------------------------
//Color Compliance
  calculateCompliantColors(_foreground, _background) {
  this.foreground = _foreground;
  this.background = _background;
  this.contrastRatio = this.getContrastRatio(_foreground, _background);
  const result = {
    "original-foreground": _foreground,
    "original-background": _background,
    "original-contrast-ratio": `${this.contrastRatio.toFixed(2)}:1`,
    "normal-aa": this.checkCompliance(4.5),
    "normal-aaa": this.checkCompliance(7),
    "large-aa": this.checkCompliance(3),
    "large-aaa": this.checkCompliance(4.5),
  };

  return result;
  }
  checkCompliance(_level) {
  if (this.contrastRatio >= _level) {
    return [
      {
        "foreground":this.foreground,
        "background":this.background,
        "contrast-ratio": `${this.contrastRatio.toFixed(2)}:1`,
      },
    ];
  } else {
    return null;
  }
}
  getContrastRatio(_foreground, _background) {
  this.foreground = _foreground;
  this.background = _background;
  const L1 = this.getLuminance(this.foreground);
  const L2 = this.getLuminance(this.background);
  this.contrastRatio =
    L1 >= L2
      ? (L1 + 0.05) / (L2 + 0.05)
      : (L2 + 0.05) / (L1 + 0.05);

  return this.contrastRatio;
}
  getLuminance(_hexColor) {
  this.hexColor = _hexColor;
  const r = parseInt(this.hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(this.hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(this.hexColor.slice(5, 7), 16) / 255;

  const sRGB = [r, g, b].map((channel) => {
    if (channel <= 0.03928) {
      return channel / 12.92;
    }
    return Math.pow((channel + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}
}

// Contrast = new Contrast_V2()
// const result = Contrast.calculateCompliantColors("#000000", "#FCFCFC");
// console.log(JSON.stringify(result, null, 2));
module.exports = Contrast_V2;
