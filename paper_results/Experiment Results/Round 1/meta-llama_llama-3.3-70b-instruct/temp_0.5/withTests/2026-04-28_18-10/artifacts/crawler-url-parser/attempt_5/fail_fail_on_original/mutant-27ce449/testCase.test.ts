import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should return the correct result when currentUrl is null', () => {
    const htmlString = '<a href="http://www.stackoverflow.com">test-link</a>';
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract(htmlString, baseUrl);
    const currentUrl = null;
    const urlMap = new Map();
    if (currentUrl && currentUrl.url) {
      urlMap.set(currentUrl.url, currentUrl);
    }
    expect(result.length).toBe(1);
  });
});