import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse URL with utm query parameters and other parameters', () => {
    const url = 'https://www.example.com/path?utm_x=example&ref=123';
    const parsedUrl = parse(url);
    if (!parsedUrl) {
      throw new Error('Parsed URL is null');
    }
    expect(parsedUrl.search).not.toBe('?ref=123');
  });
});