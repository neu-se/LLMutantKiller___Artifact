import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not modify the host when the host starts with www', () => {
    const url = 'http://www.example.com';
    const result = parse(url);
    expect(result.host).not.toBe('example.com');
  });
});