class Teacher {

    private teacher : HTMLElement                                           
    private sound : any
    private score: Score
    //Teacher posistion
    private x : number                                                      
    private y: number                                                     
    
    //Teacher speed
    private speedX: number                                                  
    private speedY: number                                                 
    
    private explode: boolean = false

    constructor(s: Score) {
        this.score = s
        
        //Explosion sound
        this.sound = new Howl({
            src: ['./sounds/explosion.mp3']
        });
        
        //Teacher created and added to body
        this.teacher = document.createElement("teacher")            
        document.body.appendChild(this.teacher)
        
        
        //Container created
        let container = document.getElementsByTagName("game")[0]!
        
        //Teacher is added to container
        container.appendChild(this.teacher)

        this.x = Math.random() * window.innerWidth - 40                     
        this.y = window.innerHeight + Math.random()                        

        //Speed from Teacher
        this.speedX = 0                                                     
        this.speedY = Math.random() * - 7                                   

        //Colors of teacher
        let randomNumber3 = Math.random() * 360
        this.teacher.style.filter = "hue-rotate(" + randomNumber3 + "deg)" 

        //On click teacher explode
        this.teacher.addEventListener("click", ()=> this.explodeTeacher())
        
    }

    public update(){
        this.x += this.speedX                                               
        this.y += this.speedY                                              

        //Update teacher
        this.teacher.style.transform = `translate(${this.x}px, ${this.y}px)` 

        //Hit top--> begin from bottom
        if (this.y < -100){
            this.y = 708
        }


    }

    private explodeTeacher(){
        if (this.explode == false){
            this.score.addScore(10)
            this.sound.play()
        }

        this.explode = true                                               
        this.teacher.classList.add("exploded")                                
        this.speedY = 2                                                    
        
        if (this.speedY++){
            console.log("Omlaag")
        }

        if(this.y++){
            console.log("Lower")
        }
    }
}