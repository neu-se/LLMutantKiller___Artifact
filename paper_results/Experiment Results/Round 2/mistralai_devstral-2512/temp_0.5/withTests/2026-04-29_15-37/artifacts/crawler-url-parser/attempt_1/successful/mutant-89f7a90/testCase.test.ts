import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("baseUrl fragment handling", () => {
  it("should remove fragment from baseUrl when provided", () => {
    const baseUrl = "http://example.com/path#fragment";
    const result = parse("relative", baseUrl);
    expect(result?.baseurl).toBe("http://example.com/path");
  });
});