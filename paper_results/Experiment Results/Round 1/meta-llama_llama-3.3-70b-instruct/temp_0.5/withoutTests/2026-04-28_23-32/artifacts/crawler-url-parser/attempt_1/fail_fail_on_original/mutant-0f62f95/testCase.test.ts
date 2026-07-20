import { parse } from '../../../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should return null when currentUrlStr is undefined', () => {
    const result = parse(undefined, 'http://www.example.com');
    expect(result).toBeNull();
  });
});