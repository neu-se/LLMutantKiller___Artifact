// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing hash', () => {
  it('should correctly handle baseUrl with hash and fragment', () => {
    const result = parse("path", "http://base.com#section#fragment");
    expect(result?.url).toBe("http://base.com/path");
    expect(result?.baseurl).toBe("http://base.com/");
  });
});