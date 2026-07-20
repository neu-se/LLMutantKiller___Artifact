import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should pass on the original code and fail on the mutated code', () => {
    const url = 'https://www.example.com';
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe('https://www.example.com/');
  });
});