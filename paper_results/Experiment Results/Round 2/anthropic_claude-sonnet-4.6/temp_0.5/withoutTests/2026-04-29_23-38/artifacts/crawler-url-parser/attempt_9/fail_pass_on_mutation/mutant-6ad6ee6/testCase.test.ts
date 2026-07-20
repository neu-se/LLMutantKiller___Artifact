import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function - fragment removal', () => {
  it('should extract URL without fragment contaminating the path', () => {
    const html = '<a href="http://example.com/path#ab">link</a>';
    const results = extract(html, 'http://example.com/');
    expect(results).toHaveLength(1);
    expect(results[0].url).toBe('http://example.com/path');
  });
});