import { extract } from '../../../crawler-url-parser/crawler-url-parser';

describe('extract function', () => {
  it('should not extract href with length less than or equal to 3', () => {
    const html = '<a href="ab">test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
  });
});