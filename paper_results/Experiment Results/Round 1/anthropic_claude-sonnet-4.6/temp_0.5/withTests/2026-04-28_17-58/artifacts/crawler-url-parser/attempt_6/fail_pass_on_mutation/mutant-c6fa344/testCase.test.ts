import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should parse bare domain without protocol', () => {
    const res = parse("example.com");
    expect(res).not.toBeNull();
    expect(res.url).toBe("http://example.com/");
  });
});