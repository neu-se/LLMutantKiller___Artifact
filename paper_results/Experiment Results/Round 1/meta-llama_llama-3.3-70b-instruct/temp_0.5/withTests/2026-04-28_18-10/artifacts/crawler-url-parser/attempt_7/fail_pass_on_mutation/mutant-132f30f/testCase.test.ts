import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not strip www from the host when the host starts with www and stripWWW is false', () => {
    const url = 'http://www.example.com';
    const result = parse(url);
    expect(result.host).toBe('www.example.com');
  });
});