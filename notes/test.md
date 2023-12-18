var letters = ['a','b','c','d','e','f']
var numbers = ['1','2','3','4','5','6', '7', '8', '9', '0']

var color = "#1a1111"


function isNumber(char) {
    return /^\d$/.test(char);
  }

function increaseOffset (_offset, _index, _max) {
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
function decreaseOffset (_offset, _index, _max) {
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
function increaseChar (_color, _index) {
    // console.log(color)
    //----------------------------------------------------------------------
    String.prototype.replaceAt = function(index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }
    var char = color.charAt(_index)
    var charIsNum = isNumber(char);
    // console.log(charIsNum)

    if (charIsNum==true) {
        // console.log("!isNaN")
        for (let i=0; i<=numbers.length-1; i++) {
            let target = char;
            // console.log("target: " + target)
        
            let newIndex = increaseOffset(1, i, 10)
            // console.log("letter[i]: " + numbers[i])
            if(numbers[i]==target) {
        
            // console.log("newIndex: " + newIndex)
           var newVal = numbers[newIndex]
            // console.log("newVal: " + newVal)
            let output = color.replaceAt(_index, newVal);
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
    for (let i=0; i<=letters.length-1; i++) {
    let target = char;
    // console.log("target: " + target)

    let newIndex = increaseOffset(1, i, 6)
    // console.log("letter[i]: " + letters[i])
    if(letters[i]==target) {

    // console.log("newIndex: " + newIndex)
   var newVal = letters[newIndex]
    // console.log("newVal: " + newVal)
    let output = color.replaceAt(_index, newVal);
    // console.log("output: " + output)
    if (output) {
        // console.log(output)
        return output;
    }
   
    }
    }
    }


}
function decreaseChar (_color, _index) {

    String.prototype.replaceAt = function(index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }
    
    var char = color.charAt(_index)
    var charIsNum = isNumber(char);
    // console.log(charIsNum)
    if (charIsNum==true) {
        console.log("!isNaN")
        for (let i=0; i<=numbers.length-1; i++) {
            let target = char;
            // console.log("target: " + target)
        
            let newIndex = decreaseOffset(1, i, 10)
            // console.log("letter[i]: " + numbers[i])
            if(numbers[i]==target) {
        
            // console.log("newIndex: " + newIndex)
           var newVal = numbers[newIndex]
            // console.log("newVal: " + newVal)
            let output = color.replaceAt(_index, newVal);
            // console.log("output: " + output)
            if (output) {
                // console.log(output)
                return output;
            }
           
            }
            }
        }  
    else if (typeof char == 'string'&&isNaN) {
    for (let i=0; i<=letters.length-1; i++) {
    let target = char;
    console.log("target: " + target)
    let newVal;
    let newIndex = decreaseOffset(1, i, 6)
    // console.log("newIndex: " + newIndex)
    if(letters[i]==target) {
    // console.log("target found:" + letters[i] + " i: " + i)
    console.log("newIndex: " + newIndex)
    newVal = letters[newIndex]
    // console.log("newVal: " + newVal)
    output = color.replaceAt(_index, newVal);
    console.log(output)
    return output;
    break;
    }
    }
    }

  
}

color = increaseChar(color, 2);



// increaseChar(color, 4)
// increaseChar(color, 6)
// color = decreaseChar(color, 2);
// color = decreaseChar(color, 4);
// color = decreaseChar(color, 6);

console.log("New Color:" + color)
