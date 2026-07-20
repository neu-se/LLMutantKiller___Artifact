import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL correctly', () => {
    const url = 'https://example.com/path?query#fragment';
    const parsedUrl = parse(url);
    expect(parsedUrl.url).not.toContain('#');
  });
});