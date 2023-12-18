function calculateCompliantColors(foreground, background) {
    const contrastRatio = getContrastRatio(foreground, background);
  
    function checkCompliance(level) {
      if (contrastRatio >= level) {
        return [
          {
            foreground,
            background,
            "contrast-ratio": `${contrastRatio.toFixed(2)}:1`,
          },
        ];
      } else {
        return null;
      }
    }
  
    const result = {
      "original-foreground": foreground,
      "original-background": background,
      "original-contrast-ratio": `${contrastRatio.toFixed(2)}:1`,
      "normal-aa": checkCompliance(4.5),
      "normal-aaa": checkCompliance(7),
      "large-aa": checkCompliance(3),
      "large-aaa": checkCompliance(4.5),
    };
  
    return result;
  }
  
  function getContrastRatio(foreground, background) {
    const L1 = getLuminance(foreground);
    const L2 = getLuminance(background);
    const contrastRatio =
      L1 >= L2
        ? (L1 + 0.05) / (L2 + 0.05)
        : (L2 + 0.05) / (L1 + 0.05);
  
    return contrastRatio;
  }
  
  function getLuminance(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16) / 255;
    const g = parseInt(hexColor.slice(3, 5), 16) / 255;
    const b = parseInt(hexColor.slice(5, 7), 16) / 255;
  
    const sRGB = [r, g, b].map((channel) => {
      if (channel <= 0.03928) {
        return channel / 12.92;
      }
      return Math.pow((channel + 0.055) / 1.055, 2.4);
    });
  
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  }
  
  // Example usage:
  const result = calculateCompliantColors("#68656c", "#726c64");
  console.log(JSON.stringify(result, null, 2));
  console.log("test2.js")