import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse URL with utm query parameters', () => {
    const url = 'https://www.example.com/path?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale&ref=123';
    const parsedUrl = parse(url);
    expect(parsedUrl.search).toBe('?ref=123');
  });
});