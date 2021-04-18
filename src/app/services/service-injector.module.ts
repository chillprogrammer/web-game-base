import { ResourceManager } from './resource-manager/resource-manager.service'
import { SoundManager } from './sound-manager/sound-manager.service';

const module = {
    serviceClasses: [ResourceManager, SoundManager],
}
let listOfServices: any = [];
module.serviceClasses.forEach(element => {
    listOfServices.push(new element());
});

/**
 * Returns the instantiated service object specified by class name.
 * @param classType The CLass of the injected service
 * @returns Returns the service if it exists. Returns undefined if the service does not exist.
 */
export function getServiceByClass(classType: any) {
    for (let i = 0; i < listOfServices.length; ++i) {
        let service: any = listOfServices[i];
        if (classType.name === service.constructor.name) {
            return service;
        }
    }

    // Service does not exist
    return undefined;
}