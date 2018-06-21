///<reference path="gameobject.ts"/>

class Start extends GameObject {

    constructor(s:Pages) {
        console.log("IK BEN EEN STARTtt SCREEN");
        
        super(s)

        //Click to start
        this.div.addEventListener("click", ()=>this.startClicked())
        
        //Div with start text
        this.div.innerHTML = "START"
    }

    public update(){
    }

    private startClicked() {   
        //On click forward to game.ts      
        this.page.showPlayScreen()
    }
}