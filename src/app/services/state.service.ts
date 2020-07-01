import { Injectable } from '@angular/core';

@Injectable()
export class StateService {
    public pageTitle: string;
    public activeUser: any;
    public _rightDrawer: boolean = false;
    public _leftDrawer: boolean = false;
    public _bottomDrawer: boolean = false;
    
    constructor() {
    }

    get rightDrawer() : boolean {
        return this._rightDrawer;
    }

    set rightDrawer(value: boolean) {
        this._rightDrawer = value;
    }

    get leftDrawer() : boolean {
        return this._leftDrawer;
    }

    set leftDrawer(value: boolean) {
        this._leftDrawer = value;
    }

    get bottomDrawer() : boolean {
        return this._bottomDrawer;
    }

    set bottomDrawer(value: boolean) {
        this._bottomDrawer = value;
    }
}
