import { Injectable }  from '@angular/core';
import { io } from "socket.io-client";
 
@Injectable()
export class AppInitService {
    
    socket = io('ws://localhost:8088/nextjs-live-updates');
 
    constructor() {}
    
    Init() {
        return new Promise<void>((resolve, reject) => {
            console.log("AppInitService.init() called");
            const namespace = '/nextjs-live-updates';
            const eventName = 'props_changed';

            // This can be used to capture events from sourcebit
            // this.socket.on(eventName, () => {});

            this.socket.on('connect', () => {
                this.socket.emit('hello');
            });

            resolve();
        });
    }
}
 