import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL correctly', () => {
    const url = "//www.stackoverflow.com/aaa/bbb/ccc";
    const result = parse(url);
    expect(result.url).toBe("http://www.stackoverflow.com/aaa/bbb/ccc");
  });
});