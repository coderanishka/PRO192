AFRAME.registerComponent('timer', {
    init: function(){
        var duration = 120
        var timer = document.querySelector('#timer')
        this.startTimer(duration, timer)
    },
    startTimer: function(duration, timer){
        var mins, secs
        setInterval(() => {
            if(duration >= 0){
                mins = parseInt(duration/60)
                secs = parseInt(duration%60)
                if(mins < 10){
                    mins = '0' + mins
                }
                if(secs < 10){
                    secs = '0' + secs
                }
                timer.setAttribute('text', {value: mins + ':' + secs})
                duration -=1
            }
        }, 1000);
    }, 
})