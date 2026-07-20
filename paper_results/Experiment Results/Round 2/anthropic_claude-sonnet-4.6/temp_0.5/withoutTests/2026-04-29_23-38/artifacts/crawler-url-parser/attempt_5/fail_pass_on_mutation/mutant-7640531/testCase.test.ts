import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract', () => {
  it('should extract URLs with fragments correctly', () => {
    const html = '<a href="http://example.com/page#section">link</a>';
    const result = extract(html, 'http://example.com/');
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('http://example.com/page');
  });
});