import { gettype, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype index normalization', () => {
  it('should return uplevel for parent index page', () => {
    const link = parse('http://www.stackoverflow.com/aaa/index.html');
    const page = parse('http://www.stackoverflow.com/aaa/bbb/index.html');
    const result = gettype(link, page);
    expect(result).toBe('uplevel');
  });
});