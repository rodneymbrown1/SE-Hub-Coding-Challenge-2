class Hexy {
    constructor() {
       this.input = "";
       this.hex="";
       this.arr_1 = [];
       this.arr_2 = [];
       this.color_1 = "";
       this.color_2 = "";
       this.count = 0;
       this.color_array = []
       this.output = {"foreground": this.color_1,
       "background": this.color_2,
       "original_hex": this.hex,
       "original_string": ''}
       this.category = {
        "normal-aa": false,
        "normal-aaa": false,
        "large-aa": false,
        "large-aaa": false,
        "contrast-ratio": "1.06:1"
       }
    }
    //------------------------------------------------------------
    stringToHex (_input) {  
        const encoded = Buffer.from(_input).toString('hex');
        this.hex=encoded;
        this.output.original_hex = encoded;
        this.input = _input;
        return encoded;
      }
    
    //------------------------------------------------------------
   splitHex (_hex) {
      if (_hex == undefined || _hex == null || _hex == "") {
          return "Please input a valid hex."
      }
      if (_hex.length < 6) {
          _hex = _hex.padEnd(6, '0');
      }
      if (_hex.length < 12) {
          _hex = _hex.padEnd(12, _hex.slice(-1));
      }
      this.color_1 = '#' + _hex.slice(0, 6);
      this.color_2 = '#' + _hex.slice(-6);
      this.output = {
        "foreground": this.color_1,
        "background": this.color_2,
        "original_hex": _hex,
        "original_string": this.input
    }
    
      return this.output

   }
    //------------------------------------------------------------
   getData(){
    return this.output;
   }
    //------------------------------------------------------------
   reset() {
    this.input = "";
       this.hex="";
       this.arr_1 = [];
       this.arr_2 = [];
       this.color_1 = "";
       this.color_2 = "";
       this.count = 0;
       this.color_array = []
   // Reset more instance variables here
  }
   //------------------------------------------------------------
   getforeGround() {
    var foreground = this.output.foreground;
       return foreground;
     }
    //------------------------------------------------------------
   getBackGround() {
    var background = this.output.background;
       return background;
     }
   //------------------------------------------------------------
   getOriginalText(_input) {
      this.output.original_string=_input
       return this.output.original_string;
     }
     setOriginalHex() {
        var original_hex = this.output.original_hex;
           return original_hex;
         }
   //------------------------------------------------------------
   getRelativeLuminance(color) {
    try{
    let red = parseInt(color.substring(1, 3), 16);
    let green = parseInt(color.substring(3, 5), 16);
    let blue = parseInt(color.substring(5, 7), 16);

    let percentRed = red / 225;
    let percentGreen = green / 225;
    let percentBlue = blue / 225;

    let redLum = percentRed <= 0.04045 ? percentRed / 12.92 : Math.pow((percentRed + 0.055) / 1.055, 2.4);
    let greenLum = percentGreen <= 0.04045 ? percentGreen / 12.92 : Math.pow((percentGreen + 0.055) / 1.055, 2.4);
    let blueLum = percentBlue <= 0.04045 ? percentBlue / 12.92 : Math.pow((percentBlue + 0.055) / 1.055, 2.4);

    return 0.2126 * redLum + 0.7152 * greenLum + 0.0722 * blueLum;
    }
    catch (e){
        console.log(e)
    }
}
   //------------------------------------------------------------
    getContrastRatio(foreground, background) {
    let lumFore = this.getRelativeLuminance(foreground);
    let lumBack = this.getRelativeLuminance(background);
    return (Math.max(lumFore, lumBack) + 0.05) / (Math.min(lumFore, lumBack) + 0.05);
}
    //------------------------------------------------------------
    getRatioCategory (_ratio) {
        if(_ratio) {
        var cRatio = _ratio;
        var l_AAA;
        var n_AAA;
        var l_AA;
        var n_AA;


        if (cRatio >= 7) {
            this.category['normal-aa']=false;
            this.category['normal-aaa']=false;
            this.category['large-aa']=false;
            this.category['large-aaa']=true;
            this.category['contrast-ratio']=cRatio;
            
        } else if (cRatio >= 4.5) {
            this.category['normal-aa']=false;
            this.category['normal-aaa']=true;
            this.category['large-aa']=false;
            this.category['large-aaa']=false;
            this.category['contrast-ratio']=cRatio;
        } else if (cRatio >= 3) {
            this.category['normal-aa']=false;
            this.category['normal-aaa']=false;
            this.category['large-aa']=true;
            this.category['large-aaa']=false;
            this.category['contrast-ratio']=cRatio;
        } else {
            this.category['normal-aa']=true;
            this.category['normal-aaa']=false;
            this.category['large-aa']=false;
            this.category['large-aaa']=false;
            this.category['contrast-ratio']=cRatio;
        }
    return this.category;
        }
   }
}

module.exports = Hexy;

