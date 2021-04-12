import { Game } from "./game"

export class App {

    /**
     * Initializes everything in the app.
     */
    init() {

        // TODO Add splashscreen logic here.

        let game = new Game();
        game.init();
    }
}