import { parse } from './crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without protocol', () => {
    const url = ':example.com';
    const baseUrl = undefined;
    const resultOriginal = parse(url, baseUrl);
    expect(resultOriginal).toBeNull();
    const resultMutated = parse(url, baseUrl);
    expect(resultMutated).not.toBeNull();
  });
});