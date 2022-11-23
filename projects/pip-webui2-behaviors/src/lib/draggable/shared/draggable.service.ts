import { Injectable } from '@angular/core';
import { DraggableListener } from './draggable-listener.model';

@Injectable()
export class PipDraggableService {
    private _listeners: DraggableListener[] = [];

    public inputEvent(event) {
        if (event.touches !== undefined) {
            return event.touches[0];
        } else if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            return event.originalEvent.touches[0];
        }
        return event;
    }

    public broadcast(eventName, obj) {
        const event = { name: eventName };
        this._listeners.forEach((listner: DraggableListener) => {
            if (listner.eventName === eventName) { listner.triggerFunction(event, obj); }
        });
    }

    public on(eventName: string, trigger: Function) {
        const id = String(this._listeners.length);
        this._listeners.push({ eventName: eventName, triggerFunction: trigger, id: id });

        return id;
    }

    public off(id: string) {
        const index = this._listeners.findIndex((listener: DraggableListener) => {
            return id === listener.id;
        });

        this._listeners.splice(index, 1);
    }
}
