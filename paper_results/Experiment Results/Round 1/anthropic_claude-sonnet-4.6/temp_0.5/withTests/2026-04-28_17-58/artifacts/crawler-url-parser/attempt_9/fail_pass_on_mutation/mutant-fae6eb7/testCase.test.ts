import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse mutation detection', () => {
  it('should detect hash regex mutation through baseUrl processing', () => {
    const result = parse("//www.example.com/page", "http://www.base.com/path#frag");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/page");
  });
});