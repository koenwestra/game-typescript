class Timer {
    private clock:HTMLElement

    //1 minuut
    private secondes : number = 3000

    private posX : number = 0
    private posY : number = 0

    public finished:boolean = false


    constructor() {
        
        //Clock created
        this.clock = document.createElement("clock")
        document.body.appendChild(this.clock)

        this.clock.innerHTML = "Time: 500"

        //Container created
        let container = document.getElementsByTagName("game")[0]!

        container.appendChild(this.clock)

        //Clock posistion
        this.posX = (innerWidth/2)-150

        //Show update from teacher
        this.clock.style.transform = `translate(${this.posX}px, ${this.posY}px)`


    }
      
    public update(){
        this.clock.innerHTML = "Tijd " + Math.floor(this.secondes/50)
        
        //Counter stops at 0
        if (this.secondes > 0){
            //Update seconds
            this.secondes--
        } else{
            //Forward to gameover.ts
            this.finished = true
        }
    } 
}
