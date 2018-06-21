///<reference path = "gameobject.ts"/>

class Gameover extends GameObject {
    
    constructor(s: Pages) {
        super(s)
    
        //Click for new game
        this.div.addEventListener("click",()=> this.Clicked())

        //Empty div with Gameover
        this.div.innerHTML = "Play again"

    }

    public update(): void {

    }

    private Clicked() {   
        //On click forward to game.ts 
        //After that forwarded to howPlayScreen() function.

        this.page.showPlayScreen()
    }
}