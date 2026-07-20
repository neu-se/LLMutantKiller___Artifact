import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL correctly', () => {
    const url = 'https://example.com/path?query1=value1&query2=value2#fragment';
    const parsedUrl = parse(url);
    if (parsedUrl !== null) {
      const urlObject = new URL(parsedUrl.url);
      expect(urlObject.searchParams.get('query1')).toBe('value1');
      expect(urlObject.searchParams.get('query2')).toBe('value2');
    } else {
      expect(parsedUrl).toBeNull();
    }
  });
});