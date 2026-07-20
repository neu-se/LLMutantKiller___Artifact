import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with baseUrl containing fragment", () => {
  it("should correctly handle baseUrl with fragment and not include replacement string", () => {
    const result = parse("relative/path", "http://example.com/base#fragment");
    expect(result?.url).toBe("http://example.com/relative/path");
    expect(result?.baseurl).toBe("http://example.com/base");
  });
});