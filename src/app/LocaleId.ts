import { LocaleService } from "../local";

export class LocaleId extends String {
    
    constructor(private localeService: LocaleService) {
      super();
    }
  
    override toString(): string {
      return this.localeService.currentLocale;
    }
  
    override valueOf(): string {
      return this.toString();
    }
  }