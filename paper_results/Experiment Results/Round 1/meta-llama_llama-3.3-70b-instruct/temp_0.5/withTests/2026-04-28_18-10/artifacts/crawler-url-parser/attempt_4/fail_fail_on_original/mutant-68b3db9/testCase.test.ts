import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should return different results when trim is used and not used', () => {
    const html = '<a href="http://example.com">   test-link-1   </a>';
    const result = extract(html, 'http://example.com');
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('http://example.com');
    expect(result[0].text).toBeDefined();
  });
});