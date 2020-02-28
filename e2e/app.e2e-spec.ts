import { SIEPage } from './app.po';

describe('sie App', () => {
  let page: SIEPage;

  beforeEach(() => {
    page = new SIEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
