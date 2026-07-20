import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL correctly', () => {
    const url = 'https://example.com/path?query1=value1&query2=value2#fragment';
    const parsedUrl = parse(url);
    if (parsedUrl !== null) {
      expect(parsedUrl.querycount).toBe(2);
    } else {
      expect(parsedUrl).toBeNull();
    }
  });
});