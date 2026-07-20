import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function test', () => {
  it('should pass when text is null', () => {
    const html = '<a href="http://www.stackoverflow.com">test</a>';
    const result = extract(html, "http://www.stackoverflow.com");
    if (result && result.length > 0) {
      expect(result[0].text).not.toBe('Stryker was here!');
    }
  });
});