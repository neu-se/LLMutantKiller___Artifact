import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL correctly', () => {
    const url = 'https://example.com/path?query#fragment';
    const parsedUrl = parse(url);
    expect(parsedUrl.url).toBe('https://example.com/path?query');
  });

  it('should parse URL with query parameters and fragment correctly', () => {
    const url = 'https://example.com/path?query#fragment';
    const parsedUrl = parse(url);
    const urlObject = new URL(parsedUrl.url);
    expect(urlObject.search).toBe('?query');
    expect(urlObject.hash).toBe('');
  });
});