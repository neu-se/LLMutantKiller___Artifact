import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const originalUrl = 'localhost:8080';
    const parsedUrl = parse(originalUrl);
    expect(parsedUrl).not.toBeNull();
    expect(parsedUrl.url).toBe('http://localhost:8080/');
  });
});