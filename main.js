navigator.requestMIDIAccess()
.then(function(midiAccess) {
midiOutput = Array.from(midiAccess.outputs.values())[0]
})

function playNote(partNum) {
    midiOutput.send([0x99, partNum, 127]) //note on message
    // setTimeout(function() {
    //     midiOutput.send([0x89, partNum, 0])
    //   }, 
    //   30)
  }
function stopNote(partNum) {
    midiOutput.send([0x89, partNum, 0])
}

function getRandomHue(){
    return Math.floor(Math.random()*360)
}

class Pad {
    constructor(name, noteNumber) {
        this.name = name,
        this.noteNumber = noteNumber
        }
}

let pads = []
let totalPads = 8

for (let i = 0; i < totalPads; i++) {
    pads.push(new Pad("pad" + (i + 1).toString(), 36 + i))
}

let main = document.getElementById('main')

for (let i = 0; i < pads.length; i++){
    pads[i]["button"] = document.createElement('button')
    main.appendChild(pads[i]["button"])
    pads[i]["button"].onmousedown = function () {
        playNote(pads[i].noteNumber)
    }
    pads[i]["button"].onmouseup = function () {
        stopNote(pads[i].noteNumber)
    }
}
