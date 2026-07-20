import { parse } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should return null when the input URL contains illegal characters', () => {
    const url = 'http://example.com/abc?utm_source=google&utm_medium=cpc';
    const result = parse(url);
    expect(result.querycount).toBe(0);
  });
});