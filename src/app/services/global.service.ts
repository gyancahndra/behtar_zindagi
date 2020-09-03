import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  showHideLoader = false;
  HideLoader = true;
  excelHideLoader = true;
  billLoader = false;
  constructor() { }

  getLoaderState() {
    return this.HideLoader;
  }

  setLoaderState(value) {
    this.HideLoader = value;
  }
}
