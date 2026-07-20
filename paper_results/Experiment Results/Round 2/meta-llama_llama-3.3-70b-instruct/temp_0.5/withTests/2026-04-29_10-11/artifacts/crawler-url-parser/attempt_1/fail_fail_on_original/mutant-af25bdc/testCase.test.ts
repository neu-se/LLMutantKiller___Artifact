import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('Test the extract function with a specific HTML string and base URL', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const htmlString = '<html><body><a href="http://www.stackoverflow.com">test-link</a></body></html>';
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://www.stackoverflow.com/');
    expect(result[0].type).toBe('internal');
  });
});