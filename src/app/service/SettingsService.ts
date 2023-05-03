import { Injectable } from "@angular/core";


@Injectable()
export class SettingsService {

   private _selected : string;

  constructor() {
    this._selected = 'ru';
  }

  set selected(lang : string) {
    this._selected = lang;
  }

  get selected() : string {
    return this._selected;
  }

}