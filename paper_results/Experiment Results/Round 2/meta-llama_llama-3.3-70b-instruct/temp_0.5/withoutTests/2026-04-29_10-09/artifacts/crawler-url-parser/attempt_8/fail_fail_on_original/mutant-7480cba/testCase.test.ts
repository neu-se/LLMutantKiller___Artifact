import { parse } from '../crawler-url-parser.js';

describe('parse function', () => {
  it('should handle URLs without protocols correctly', () => {
    const url = ':example.com';
    const resultOriginal = parse(url);
    expect(resultOriginal).toBeNull();
    const urlMutated = 'a:example.com';
    const resultMutated = parse(urlMutated);
    expect(resultMutated).not.toBeNull();
  });
});