import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should remove trailing slash from URL', () => {
    const url = 'https://www.example.com/path/';
    const result = parse(url);
    expect(result.url).toBe('https://www.example.com/path');
  });
});