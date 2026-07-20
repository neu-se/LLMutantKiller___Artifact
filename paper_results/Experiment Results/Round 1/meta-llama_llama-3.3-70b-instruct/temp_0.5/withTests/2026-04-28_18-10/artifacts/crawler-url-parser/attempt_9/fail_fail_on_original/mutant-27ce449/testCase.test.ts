import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should not add multiple entries for the same url to the urlMap', () => {
    const htmlString = '<a href="http://www.stackoverflow.com">test-link</a><a href="http://www.stackoverflow.com">test-link-2</a>';
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://www.stackoverflow.com');
    expect(result[0].text).toBe('test-link test-link-2');
  });
});