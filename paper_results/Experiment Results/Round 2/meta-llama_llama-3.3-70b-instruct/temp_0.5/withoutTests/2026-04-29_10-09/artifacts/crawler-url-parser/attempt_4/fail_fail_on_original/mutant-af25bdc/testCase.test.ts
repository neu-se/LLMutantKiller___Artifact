import { parse } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should return null when the input URL is undefined', () => {
    expect(parse(undefined, 'https://example.com')).toBeNull();
  });
});