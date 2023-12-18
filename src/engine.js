var Hexy = require('./hexy');
var Contrast_V2 = require('./contrastV2');
// require('./htmlUtils');
var { io } = require('socket.io-client');
require("regenerator-runtime/runtime");
require('dotenv').config();
//============================================================
var input = document.getElementById('user-input');
var treeLevels = document.querySelectorAll('.tree-level');
var treeMain = document.getElementById('tree-main');
var div1 = document.getElementById('original-text');
var div2 = document.getElementById('original-hex');
var div3 = document.getElementById('original-output');
var div4 = document.getElementById('c-ratio');
var btn1 = document.getElementById('down-button');
var btn2 = document.getElementById('up-button');
var btn3 = document.getElementById('down-button2');
var btn4 = document.getElementById('up-button2');
var container = document.getElementById("data-container");
//============================================================
//Setup and configure Socket IO
const socket = io(process.env.WEBPAGE_URL);
socket.on('connect', () =>{
    console.log('you connected with id: ' + socket.id);
})
//============================================================
//Misc Functions
function sendData() {
    input.addEventListener('input', function(event) {
        socket.emit('event', event.target.value);
      });
}
//============================================================
//Input Listners
Hexy = new Hexy();
Contrast = new Contrast_V2();
var foreground;
var background;
var contrast; 
var category;
var hex;
var out;
   input.addEventListener('input', function(event) {
    
    hex = Hexy.stringToHex(event.target.value);
    out = Hexy.splitHex(hex);
    for (let i = 0; i < treeLevels.length; i++) {
        treeLevels[i].style.borderBottomColor = Hexy.getforeGround();
      }
    treeMain.style.background = Hexy.getBackGround();
    // div3.innerText=JSON.stringify(out);
  
    foreground = Hexy.getforeGround();
    background = Hexy.getBackGround();

    if (foreground&&background){
        // contrast = Hexy.getContrastRatio(foreground, background);
        contrast = Contrast.calculateCompliantColors(foreground, background);
        category = Hexy.getRatioCategory(contrast);
        // div4.innerText=JSON.stringify(category);    
        insertTextIntoDivs(category, container);  
    }      
   });
//============================================================
//Click Listners

    //Decrease Tree Brightness
    btn1.addEventListener('click', (event) =>{
    if(foreground&&background) {
        foreground=Contrast.decreaseBrightness(foreground, 10)
        contrast = Contrast.calculateCompliantColors(foreground, background);
        category = Hexy.getRatioCategory(contrast);
        insertTextIntoDivs(category, container);  
        }
        for (let i = 0; i < treeLevels.length; i++) {
            treeLevels[i].style.borderBottomColor = foreground
          }
    })

    //Increase Tree Brightness
    btn2.addEventListener('click', (event) =>{
        if(foreground&&background) {
            foreground=Contrast.increaseBrightness(foreground, 10)
            contrast = Contrast.calculateCompliantColors(foreground, background);
            category = Hexy.getRatioCategory(contrast);
            insertTextIntoDivs(category, container); 
            }
            for (let i = 0; i < treeLevels.length; i++) {
                treeLevels[i].style.borderBottomColor = foreground
              }
            })
//-----------------------------------------------------------------------------
    //Decrease Tree Background Brightness
    btn3.addEventListener('click', (event) =>{
        if(foreground&&background) {
            background=Contrast.decreaseBrightness(background, 10);
            treeMain.style.background = background;
            contrast = Contrast.calculateCompliantColors(foreground, background);
            category = Hexy.getRatioCategory(contrast);
            insertTextIntoDivs(category, container);  
            } 
        })

    //Increase Tree Background Brightness
    btn4.addEventListener('click', (event) =>{
        if(foreground&&background) { 
            background=Contrast.increaseBrightness(background, 10)
            treeMain.style.background = background;
            contrast = Contrast.calculateCompliantColors(foreground, background);
            category = Hexy.getRatioCategory(contrast);
            insertTextIntoDivs(category, container);

            }
            })
//======================================================================
function insertTextIntoDivs(data, container) {
    // Clear the existing content in the container
    container.innerHTML = '';
  
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        const div = document.createElement("div");
        div.innerText = key;
  
        // Append the div to the container
        container.appendChild(div);
  
        if (typeof value === "object") {
          if (Array.isArray(value)) {
            // If it's an array, create divs for each element
            for (let i = 0; i < value.length; i++) {
              const arrayItem = value[i];
              const arrayItemDiv = document.createElement("div");
              arrayItemDiv.innerText = JSON.stringify(arrayItem);
              div.appendChild(arrayItemDiv);
            }
          } else {
            // If it's an object, recursively insert its contents
            insertTextIntoDivs(value, div);
          }
        } else {
          // If it's a primitive value, insert it as text
          const textDiv = document.createElement("div");
          textDiv.innerText = value.toString();
          div.appendChild(textDiv);
        }
      }
    }
  }




