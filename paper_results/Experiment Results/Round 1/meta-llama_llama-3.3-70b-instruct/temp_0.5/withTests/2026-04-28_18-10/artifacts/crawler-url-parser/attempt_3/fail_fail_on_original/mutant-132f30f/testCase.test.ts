import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should strip www from the host when it is the default subdomain', () => {
    const url = 'http://www.example.com/path';
    const result = parse(url);
    expect(result.url).toBe('http://example.com/path');
  });
});