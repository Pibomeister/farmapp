import { browser, element, by } from 'protractor';

export class FarmAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('fa-root h1')).getText();
  }
}
