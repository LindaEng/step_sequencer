//Google chrome won't allow sound to play unless there is a user interaction.
document.querySelector('button').addEventListener('click', function() {
  Tone.context.resume().then(() => {
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

    const $rows = document.body.querySelectorAll('div > div'); 
    const notes =['G5','E4','C3'];
    let index = 0;


    Tone.Transport.scheduleRepeat(repeat, '8n'); 

    Tone.context.resume();
    Tone.Transport.start();
    Tone.context.resume();


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

    console.log('Playback resumed successfully');
  });

});



