import { extract } from '../crawler-url-parser';

describe('extract function', () => {
  it('should extract href with length 4', () => {
    const html = '<a href="abcd">test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
  });
});