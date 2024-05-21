import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UtilityService {

    darkMode: boolean = false;

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
    }

}
