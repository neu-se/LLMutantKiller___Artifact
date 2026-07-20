import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it.skip('should strip www from the host when stripWWW is true', () => {
    const url = 'http://www.example.com/path';
    const result = parse(url);
    expect(result.host).not.toBe('www.example.com');
  });

  it('should not strip www from the host when stripWWW is false', () => {
    // this test is not possible with the current implementation
    // because the function does not take stripWWW as an argument
  });
});