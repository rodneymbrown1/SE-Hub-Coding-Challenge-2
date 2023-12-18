**Deprecated**
class Contrast {
    constructor () {
        this.letters = ['a','b','c','d','e','f']
        this.numbers = ['0','1','2','3','4','5','6', '7','8','9']
    }

    increaseOffset (_offset, _index, _max) {
        let output = 0;
        output=_index+_offset
        let diff = Math.abs(_index-_offset)
        // console.log("diff: " + diff)
        if (output>=_max) {
            output=diff
        }
    // console.log("newIndex:" + output )
    return output
    }

    decreaseOffset (_offset, _index, _max) {
        let output = 0;
        output=_index-_offset //outputs the new index for tge char
        let diff = _offset-_index
        // console.log('diff: '+ diff)
        if (output<0) {
            output=_max-Math.abs(diff)
        }
        // console.log("output: " + output)
    return Math.abs(output)
    }

    increaseChar (_index) {
        // console.log(this.color)
        //----------------------------------------------------------------------
        String.prototype.replaceAt = function(index, replacement) {
            return this.substring(0, index) + replacement + this.substring(index + replacement.length);
        }
        var char = this.color.charAt(_index)
        var charIsNum = this.isNumber(char);
        // console.log(charIsNum)
    
        if (charIsNum==true) {
            // console.log("!isNaN")
            for (let i=0; i<=this.numbers.length-1; i++) {
                let target = char;
                // console.log("target: " + target)
            
                let newIndex = this.increaseOffset(1, i, 10)
                // console.log("letter[i]: " + this.numbers[i])
                if(this.numbers[i]==target) {
            
                // console.log("newIndex: " + newIndex)
               var newVal = this.numbers[newIndex]
                // console.log("newVal: " + newVal)
                let output = this.color.replaceAt(_index, newVal);
                // console.log("output: " + output)
                if (output) {
                    // console.log(output)
                    return output;
                }
               
                }
                }
            }  
        //----------------------------------------------------------------------
        else if (typeof char == 'string'&&isNaN) {
        for (let i=0; i<=this.letters.length-1; i++) {
        let target = char;
        // console.log("target: " + target)
    
        let newIndex = this.increaseOffset(1, i, 6)
        // console.log("letter[i]: " + this.letters[i])
        if(this.letters[i]==target) {
    
        // console.log("newIndex: " + newIndex)
       var newVal = this.letters[newIndex]
        // console.log("newVal: " + newVal)
        let output = this.color.replaceAt(_index, newVal);
        // console.log("output: " + output)
        if (output) {
            // console.log(output)
            return output;
        }
       
        }
        }
        }
    
    
    }

    decreaseChar (_index) {

        String.prototype.replaceAt = function(index, replacement) {
            return this.substring(0, index) + replacement + this.substring(index + replacement.length);
        }
        
        var char = this.color.charAt(_index)
        var charIsNum = this.isNumber(char);
        // console.log(charIsNum)
        if (charIsNum==true) {
            // console.log("!isNaN")
            for (let i=0; i<=this.numbers.length-1; i++) {
                let target = char;
                // console.log("target: " + target)
            
                let newIndex = this.decreaseOffset(1, i, 10)
                // console.log("letter[i]: " + this.numbers[i])
                if(this.numbers[i]==target) {
            
                // console.log("newIndex: " + newIndex)
               var newVal = this.numbers[newIndex]
                // console.log("newVal: " + newVal)
                var output = this.color.replaceAt(_index, newVal);
                // console.log("output: " + output)
                if (output) {
                    // console.log(output)
                    return output;
                }
               
                }
                }
            }  
        else if (typeof char == 'string'&&isNaN) {
        for (let i=0; i<=this.letters.length-1; i++) {
        let target = char;
        // console.log("target: " + target)
        let newVal;
        let newIndex = this.decreaseOffset(1, i, 6)
        // console.log("newIndex: " + newIndex)
        if(this.letters[i]==target) {
        // console.log("target found:" + this.letters[i] + " i: " + i)
        // console.log("newIndex: " + newIndex)
        newVal = this.letters[newIndex]
        // console.log("newVal: " + newVal)
        output = this.color.replaceAt(_index, newVal);
        // console.log(output)
        return output;
         }
        }
        }
    
      
    }

    increaseBrightness (_color) {
    this.color = _color;
    this.color = this.increaseChar(2)
    this.color = this.increaseChar(4)
    this.color = this.increaseChar(6)
    return this.color;
    }

    decreaseBrightness (_color) {
    this.color = _color;
    this.color = this.decreaseChar(2)
    this.color = this.decreaseChar(4)
    this.color = this.decreaseChar(6)
    return this.color;
    }

    isNumber(char) {
        return /^\d$/.test(char);
      }
}
module.exports = Contrast