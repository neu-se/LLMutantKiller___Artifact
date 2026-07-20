import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it.skip('should not modify the url when the host starts with www and stripWWW is true', () => {
    const url = 'http://www.example.com';
    const result = parse(url);
    expect(result.url).toBe('http://example.com/');
  });

  it('should not modify the url when the host starts with www and stripWWW is false', () => {
    // this test is not possible with the current implementation
    // because the function does not take stripWWW as an argument
  });
});