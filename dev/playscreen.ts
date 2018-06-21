class Playscreen {

    private page : Pages 
    private timer : Timer
    private score : Score
    private teacher:Teacher[] = []
    private sound: any

    constructor(s:Pages) {
        //Screen must have a value
        this.page = s

        //Added timer
        this.timer = new Timer()   

        //Added Score
        this.score = new Score()                

        //Push number of teachers
        for (let i = 0; i < 15; i++) {
           this.teacher.push(new Teacher(this.score))
        }

        this.sound = new Howl({
            src: ['./sounds/theme-song.mp3'],
            autoplay: true,
            loop: true
        });

        this.sound.play();
        
        this.gameLoop()
        
    }
    
    private gameLoop(){
        //Update every teacher
        for(let b of this.teacher){
            
            b.update()
        }

        //Update timer 
        this.timer.update()

        //Upate score
        this.score.update()

        if(this.timer.finished == true) {
            
            this.sound.stop();
            this.page.showEndScreen()
            // Get gameover fucntion

        } else {
            //repeat function
            requestAnimationFrame(()=>this.gameLoop())
        }
    }   
}