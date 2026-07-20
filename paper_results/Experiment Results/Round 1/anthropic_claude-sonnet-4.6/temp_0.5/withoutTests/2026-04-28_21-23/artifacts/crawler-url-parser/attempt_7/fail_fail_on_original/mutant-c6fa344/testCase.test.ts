import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract', () => {
  it('should extract URLs from HTML without source URL', () => {
    const html = '<a href="http://example.com">link</a>';
    const result = extract(html, undefined);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('http://example.com/');
  });
});