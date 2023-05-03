import { Component,HostBinding, Inject, LOCALE_ID } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core'
import { SettingsService } from './service/SettingsService';
import { LocaleService } from '../local';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front_diploma';
  selected : any = "en";
  supportedLanguages = ["en", "ru"];
  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);

  constructor(private overlay: OverlayContainer, private localeService: LocaleService) {
    this.localeService.initLocale('en');
   }

   
  changeLanguage(){
    this.localeService.setLocale(this.selected);
  }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
    
  }
}
