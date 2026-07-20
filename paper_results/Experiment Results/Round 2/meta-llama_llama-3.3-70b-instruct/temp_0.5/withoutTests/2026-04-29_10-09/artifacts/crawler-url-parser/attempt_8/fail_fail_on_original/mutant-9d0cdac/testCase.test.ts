import { parse } from '../../../crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without a protocol', () => {
    const url = 'example.com';
    const resultOriginal = parse(url);
    expect(resultOriginal.url).toBe('http://example.com');

    // Simulate the mutation by changing the URL to one that would be affected by the mutation
    const urlMutated = 'example:com';
    const resultMutated = parse(urlMutated);
    expect(resultMutated).not.toBeNull();
  });
});