navigator.requestMIDIAccess()
.then(function(midiAccess) {
midiOutput = Array.from(midiAccess.outputs.values())[0]
})

function playNote(partNum) {
    midiOutput.send([0x99, partNum, 127]) //note on message
    setTimeout(function() {
        midiOutput.send([0x89, partNum, 0])
      }, //note off message
      30) //ms delay before sending note off
  }

function getRandomHue(){
    return Math.floor(Math.random()*360)
}

class Pad {
    constructor(name, noteNumber, hue, button) {
        this.name = name,
        this.noteNumber = noteNumber,
        this.hue = hue
        }
        play() {
            return playNote(this.noteNumber);
        }
}

let pads = []
let totalPads = 8

for (let i = 0; i < totalPads; i++) {
    pads.push(new Pad("pad" + (i + 1).toString(), 36 + i, getRandomHue()))
}


let main = document.getElementById('main')

for (pad in pads){
    pad["button"] = document.createElement('button')
    main.appendChild(pad.button)
    pad["button"].onclick = function () {
        playNote(pad.noteNumber)
    }

}