import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract correctly types links relative to page with default.html', () => {
  it('should classify link as uplevel when page is default.html and link is parent directory', () => {
    const html = '<html><body><a href="http://www.stackoverflow.com/aaa/bbb/">parent</a></body></html>';
    const sourceUrl = 'http://www.stackoverflow.com/aaa/bbb/ccc/default.html';
    const result = extract(html, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].type).toBe('uplevel');
  });
});