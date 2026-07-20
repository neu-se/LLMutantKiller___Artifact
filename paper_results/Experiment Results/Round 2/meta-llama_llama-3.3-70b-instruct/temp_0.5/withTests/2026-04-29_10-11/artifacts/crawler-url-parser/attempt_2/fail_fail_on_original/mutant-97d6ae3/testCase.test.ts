import { extract } from "../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser";

describe('extract function', () => {
  it('should not add null urls to the result', () => {
    const htmlString = '<a href="http://www.stackoverflow.com/internal-1">test-link-1</a><a href="">test-link-2</a>';
    const baseUrl = 'http://www.stackoverflow.com/aaa/bbb/ccc';
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://www.stackoverflow.com/internal-1');
  });
});