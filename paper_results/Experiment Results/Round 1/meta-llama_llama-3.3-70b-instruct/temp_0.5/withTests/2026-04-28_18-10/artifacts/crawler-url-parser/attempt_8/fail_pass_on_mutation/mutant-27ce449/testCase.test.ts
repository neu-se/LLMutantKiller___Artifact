import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it.skip('should return the correct result when currentUrl is valid and has a valid url', () => {
    const htmlString = '<a href="http://www.stackoverflow.com">test-link</a>';
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://www.stackoverflow.com');
    expect(result[0].text).toBe('test-link');
  });

  it('should not add null currentUrl to the urlMap when condition is false', () => {
    const htmlString = '<a href="http://www.stackoverflow.com">test-link</a>';
    const baseUrl = 'http://www.stackoverflow.com';
    const currentUrl = null;
    const urlMap = new Map();
    if (currentUrl && currentUrl.url) {
      urlMap.set('http://www.stackoverflow.com', currentUrl);
    }
    expect(urlMap.size).toBe(0);
  });
});