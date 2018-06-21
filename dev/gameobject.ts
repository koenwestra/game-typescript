class GameObject {

    protected div: HTMLElement
    protected page : Pages

    constructor(s:Pages) {
        
        //Screen must have a value
        this.page = s  

        //Empty div is created
        this.div = document.createElement("start")

        //Container has been created
        let container = document.getElementsByTagName("game")[0]!
        
        //"Start-Text" or "Gameover-Text" added to container
        container.appendChild(this.div)

    }

    public update() {

    }


}