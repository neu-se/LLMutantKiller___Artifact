import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL containing authentication", () => {
  it("should correctly handle base URLs with authentication credentials", () => {
    const result = parse("relative-path", "http://user:pass@example.com/base/path");
    expect(result.url).toBe("http://user:pass@example.com/base/relative-path");
    expect(result.baseurl).toBe("http://user:pass@example.com/base/path");
  });
});