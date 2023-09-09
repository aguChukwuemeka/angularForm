import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {
  static config: any;

  constructor() {
    if (typeof AppConfigService.config == 'undefined') {
      AppConfigService.config = this.GetSettings();
    }
  }

  GetSettings() {
    const appSettings = this.loadSettings();
    if (!appSettings) {
      throw new Error('AppConfig unable to load');
    }
    return appSettings;
  }

  public get AdditionalAccountUrl(): string {
    if (!AppConfigService.config) {
      throw new Error('AppConfig not loaded.');
    }
    if (AppConfigService.config.environment.IsProd == true) {
      return AppConfigService.config.AdditionalAccountUrl.prod;
    }
    return AppConfigService.config.AdditionalAccountUrl.dev;
  }

  loadSettings() {
    return {
      AdditionalAccountUrl: {
        prod: 'https://ienroll.stanbicibtc.com:3443/AdditionalAccountOpening/api',
        dev: 'https://devtest.stanbicibtc.com:7443/QuickServices/AdditionalAccountOpeningAPI/api',
      },
      environment: {
        IsProd: false,
      },
      useMock: false,
      devModeLoaderInterval: 500,
    };
  }
}
