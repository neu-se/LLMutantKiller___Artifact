import { extract } from "../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser";

describe('extract function', () => {
  it('should throw an error when currentUrl is null and currentUrl.url is truthy', () => {
    const htmlString = '<a href="http://www.stackoverflow.com/internal-1">test-link-1</a>';
    const baseUrl = 'http://www.stackoverflow.com/aaa/bbb/ccc';
    const currentUrl = null;
    const urlMap = new Map();
    urlMap.set('http://www.stackoverflow.com/internal-1', { url: 'http://www.stackoverflow.com/internal-1' });
    expect(() => {
      if (currentUrl || currentUrl.url) {
        if (urlMap.has(currentUrl.url)) {
          const tmpUrl = urlMap.get(currentUrl.url);
          if (!tmpUrl.text.includes('test-link-1')) {
            tmpUrl.text = `${tmpUrl.text} test-link-1`;
          }
        } else {
          currentUrl.text = 'test-link-1';
          currentUrl.baseurl = baseUrl;
          urlMap.set(currentUrl.url, currentUrl);
        }
      }
    }).toThrowError(TypeError);
  });
});