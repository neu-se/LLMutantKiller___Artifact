import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without a protocol', () => {
    const url = 'example.com';
    const result = parse(url);
    if (result !== null) {
      expect(result.url).toBe('http://example.com/');
    } else {
      expect(result).toBe(null);
    }

    const url2 = 'http:example.com';
    const result2 = parse(url2);
    if (result2 !== null) {
      expect(result2.url).toBe('http://example.com/'); // This should fail on the mutated code
    } else {
      expect(result2).toBe(null);
    }
  });
});