//Google chrome won't allow sound to play unless there is a user interaction.
// document.getElementById('on').addEventListener('click', function(e) {
// 	// Tone.Transport.start();

// document.getElementById('play').innerText = "Pause"

 

//   if(e.target.innerText==="Turn On") {
//   	Tone.Transport.start();
// 		playSynths();
// 		document.getElementById('on').innerText="Activated"

// 	} 
// 	else {
// 	}
// });

document.getElementById('play').addEventListener('click', function(e) {
	// Tone.Transport.start();

	if(e.target.innerText==="Click Turn On To Start"){
		  	Tone.Transport.start();
		playSynths();
		document.getElementById('on').innerText="Activated"
				document.getElementById('play').innerText="Pause"
	}

	else if(e.target.innerText==="Pause"){
		console.log("pause")
		document.getElementById('play').innerText="Play";
		Tone.Transport.pause();
	}
	else if(e.target.innerText==="Play"){
		console.log("playing")
		document.getElementById('play').innerText="Pause"
		Tone.Transport.start();
	}

});

 

function playSynths(){
	var synth = new Tone.Synth().toMaster();	
	synth.triggerAttackRelease('C4', '8n');

	const synths = [
		new Tone.Synth(),
		new Tone.Synth(),
		new Tone.Synth()
	];

	synths[0].oscillator.type = 'triangle';
	synths[1].oscillator.type = 'sine';
	synths[2].oscillator.type = 'sawtooth';

	const gain = new Tone.Gain(0.6);
	gain.toMaster();
	synths.forEach(synth => synth.connect(gain));


	let index = 0;
	const $rows = document.body.querySelectorAll('div > div'); 
	const notes = ['G5','E4','C3'];

	function repeat(time) {
		let step = index % 8; //the columns

		for (let i = 0; i < $rows.length; i++) {
			let synth = synths[i]; //finds out synth
			let note = notes[i]; // finds our note
			let $row = $rows[i]; //finds our row
			let $input = $row.querySelector(`input:nth-child(${step+1}`); //nth selectors start with 1
			
			if ($input.checked) {
				synth.triggerAttackRelease(note, '8n', time);
			}
		}
		index ++;
	}

	Tone.Transport.scheduleRepeat(repeat, '8n');
	console.log('Playback resumed successfully');
}







