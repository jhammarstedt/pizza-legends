class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector('.game-canvas');
        this.cxt = this.canvas.getContext('2d');
        this.map = null;

    }

    startGameLoop(){
        const step =  () => {
            // Clear the canvas
            this.cxt.clearRect(0,0,this.canvas.width,this.canvas.height);
            
            // Establish the camera person
            const cameraPerson = this.map.gameObjects.hero;


            // Draw Lower layer
            this.map.drawLowerImage(this.cxt);
            
            //Draw game objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,

                });

                
                object.sprite.draw(this.cxt);
            });


            // Draw upper layer
            this.map.drawUpperImage(this.cxt);

            requestAnimationFrame(() => {
                step();
            })

        }
        step();
    }

    init() {
        this.map = new OverworldMap(
            window.OverworldMaps.DemoRoom,
        );
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.directionInput.direction; // "down"
        this.startGameLoop();
        
    }
}