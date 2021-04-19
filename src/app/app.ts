import { Game } from "./game"
import { SplashScreen } from "./splashscreen";

export class App {

    /**
     * Initializes everything in the app.
     */
    init() {
        // Displays the splash screen for time specified in ms.
        // After time passes, then game initializes. Splashscreen hides automatically.
        const splashScreen = new SplashScreen();
        splashScreen.display(5000).then(() => {
            new Game();
        })
    }
}