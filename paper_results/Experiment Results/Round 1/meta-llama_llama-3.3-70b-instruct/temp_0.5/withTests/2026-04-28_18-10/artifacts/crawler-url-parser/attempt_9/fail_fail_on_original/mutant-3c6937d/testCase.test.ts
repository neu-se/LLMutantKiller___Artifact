import { extract } from '../crawler-url-parser';

describe('extract function', () => {
  it('should not extract href with length 3', () => {
    const html = '<a href="abc">test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
  });
});