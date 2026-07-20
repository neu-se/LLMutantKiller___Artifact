import { extract } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should extract href with length 3', () => {
    const html = '<a href="abc">test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
  });
});