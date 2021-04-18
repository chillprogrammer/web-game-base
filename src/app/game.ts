import * as PIXI from "pixi.js"
import { getServiceByClass } from './services/service-injector.module'
import { ResourceManager } from './services/resource-manager/resource-manager.service'

const INITIAL_WIDTH = 960;
const INITIAL_HEIGHT = 640;

export class Game {

    private app: PIXI.Application;
    private resourceManager: ResourceManager = getServiceByClass(ResourceManager);

    constructor() {

    }

    /**
     * The initial function that runs for the Game object.
     * Called from the App loader class.
     */
    init() {

        //Sets the onResizeCallback
        window.onresize = this.onResizeCallback.bind(this);

        //Initialize Pixi.js
        this.initializePixiJs();

        this.initializeResources();

        //Create the game loop.
        this.app.ticker.add(delta => this.gameLoop(delta));
    }

    /**
     * Creates the Pixi.js canvas, and adds it to the HTML document.
     */
    initializePixiJs() {
        let type = "WebGL"
        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas"
        }
        PIXI.utils.skipHello();

        //Create a Pixi Application
        this.app = new PIXI.Application();

        //Add the pixi.js canvas to the HTML document
        document.body.appendChild(this.app.view);

        // Force the onResizeEvent to occur.
        window.dispatchEvent(new Event('resize'));
    }

    /**
     * This function loads any resources into memory.
     */
    initializeResources() {
        //this.Resource_Manager = // = new ResourceManager();
        this.loadTextures();
        this.loadSounds();
    }

    /**
     * This function loads any textures into memory.
     */
    loadTextures() {
        this.resourceManager.loadTextureIntoMemory("default.jpg");
    }

    /**
    * This function loads any sounds into memory.
    */
    loadSounds() {

    }

    /**
     * The main game loop - with delta time parameter.
     * @param delta the delta time between each frame
     */
    gameLoop(delta: number) {

    }

    /**
     * Callback function that runs when the window is resized.
     * Resizes the pixi.js canvas to maintain aspect ratio.
     * @param ev the window.resize event
     */
    onResizeCallback(ev: UIEvent) {
        if (this.app) {
            const w = ev.target as Window;
            const width = w.innerWidth;
            const height = w.innerHeight;

            this.app.renderer.view.style.position = "absolute";
            this.app.renderer.view.style.display = "block";

            //Calculates what the Width & Height should be to fit the same aspect ratio on the screen.
            const resolutionRatio = INITIAL_WIDTH / INITIAL_HEIGHT;
            let calculatedWidth = width;
            let calculatedHeight = width / resolutionRatio;
            if (calculatedHeight > height) {
                calculatedHeight = height;
                calculatedWidth = calculatedHeight * resolutionRatio;
            }

            //This sets the game's dimensions to what we calculated.
            this.app.renderer.resize(calculatedWidth, calculatedHeight);
        }
    }
}