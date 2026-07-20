import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should return different results when trim is used and not used', () => {
    const html = '<a href="http://example.com">   test-link-1   </a>';
    const result = extract(html, 'http://example.com');
    expect(result[0].text).toBe('test-link-1');
  });
});