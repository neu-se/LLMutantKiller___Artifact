import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract', () => {
  it('should extract and resolve URLs correctly', () => {
    const html = '<base href="http://example.com/"><a href="//other.com/page">link</a>';
    const result = extract(html, null);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('http://other.com/page');
  });
});