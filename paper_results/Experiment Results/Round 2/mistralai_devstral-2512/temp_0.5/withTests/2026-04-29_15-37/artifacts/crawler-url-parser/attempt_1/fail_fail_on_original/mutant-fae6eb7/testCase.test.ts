// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing hash', () => {
  it('should correctly handle baseUrl with hash followed by content', () => {
    const result = parse("http://example.com/path", "http://base.com#section1");
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.baseurl).toBe("http://base.com/");
  });
});