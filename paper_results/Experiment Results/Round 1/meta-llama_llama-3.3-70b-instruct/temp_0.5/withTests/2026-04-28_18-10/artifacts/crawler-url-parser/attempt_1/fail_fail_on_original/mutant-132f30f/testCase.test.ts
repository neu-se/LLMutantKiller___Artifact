import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should strip www from the host', () => {
    const url = 'http://www.example.com';
    const result = parse(url);
    expect(result.host).toBe('example.com');
  });
});