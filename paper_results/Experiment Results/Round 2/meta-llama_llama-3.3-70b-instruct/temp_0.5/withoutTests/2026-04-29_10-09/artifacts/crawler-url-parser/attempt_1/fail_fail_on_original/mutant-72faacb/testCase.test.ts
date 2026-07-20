import { extract } from '../../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle href with length less than 3 correctly', () => {
    const data = '<a href="ab">Test</a>';
    const sourceUrl = 'http://example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(0);
  });
});