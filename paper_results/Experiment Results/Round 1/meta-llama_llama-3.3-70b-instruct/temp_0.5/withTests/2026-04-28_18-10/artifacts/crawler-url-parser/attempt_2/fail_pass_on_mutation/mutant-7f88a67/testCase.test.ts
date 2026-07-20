import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function with https protocol', () => {
  it('should return the same protocol as the input URL', () => {
    const url = 'https://example.com';
    const result = parse(url);
    expect(result.protocol).toBe('https:');
  });
});