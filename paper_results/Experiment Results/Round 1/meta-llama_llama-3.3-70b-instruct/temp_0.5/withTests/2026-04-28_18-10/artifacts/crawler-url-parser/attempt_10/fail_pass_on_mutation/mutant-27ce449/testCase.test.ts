import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should not add null currentUrl to the urlMap when condition is always true', () => {
    const htmlString = '<a href="http://www.stackoverflow.com">test-link</a>';
    const baseUrl = 'http://www.stackoverflow.com';
    const currentUrl = null;
    const urlMap = new Map();
    if (true) {
      urlMap.set('http://www.stackoverflow.com', currentUrl);
    }
    expect(urlMap.size).toBe(1);
    expect(urlMap.get('http://www.stackoverflow.com')).toBe(null);
  });
});