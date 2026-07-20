import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('Test the parse function with a specific URL string', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const url = 'http://www.stackoverflow.com';
    const result = parse(url);
    expect(result.url).toBe('http://www.stackoverflow.com/');
  });
});