import { FarmAppPage } from './app.po';

describe('farm-app App', function() {
  let page: FarmAppPage;

  beforeEach(() => {
    page = new FarmAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('fa works!');
  });
});
