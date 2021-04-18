import * as PIXI from "pixi.js"

const ASSET_FOLDER_PATH = 'assets';

export class ResourceManager {
    private textureList: TextureObject[] = [];

    constructor() { }

    /**
     * Loads a texture into memory to speed up getTexture() calls later.
     * @param path the path of the image file to load.
     */
    loadTexture(path: string): void {
        let texture = PIXI.Texture.from(`${ASSET_FOLDER_PATH}/${path}`);
        this.textureList.push({ path: path, texture: texture })
    }

    /**
     * Returns a texture based on the image path provided. (from memory if already loaded, otherwise it loads from the disk).
     * @param path the path to the image used as a texture
     * @returns a PIXI.Texture, or null if unavailable.
     */
    getTexture(path: string): PIXI.Texture {

        // Checks loaded texture list first. Returns if texture is found in memory.
        for (let i = 0; i < this.textureList.length; ++i) {
            let element = this.textureList[i];
            if (path === element.path) {
                return element.texture;
            }
        }

        // Since the texture has not been loaded. We load it from the disk, and then append to the textureList.
        let texture = PIXI.Texture.from(`${ASSET_FOLDER_PATH}/${path}`);
        this.textureList.push({ path: path, texture: texture })
        return texture;
    }
}

interface TextureObject {
    path: string,
    texture: PIXI.Texture
}