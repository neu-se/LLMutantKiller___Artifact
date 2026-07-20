import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return the same host when the host starts with www and the original code is used', () => {
    const url = 'http://www.example.com';
    const result = parse(url);
    expect(result.host).toBe('example.com');
  });
});