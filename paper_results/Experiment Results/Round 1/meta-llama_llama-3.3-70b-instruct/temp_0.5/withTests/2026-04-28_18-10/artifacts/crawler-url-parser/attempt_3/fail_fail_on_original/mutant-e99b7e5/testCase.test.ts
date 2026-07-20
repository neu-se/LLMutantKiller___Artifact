import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function test', () => {
  it('should pass when text is null', () => {
    const html = '<a href="http://www.stackoverflow.com"></a>';
    const result = extract(html, "http://www.stackoverflow.com");
    expect(result[0].text).toBe('');
  });
});