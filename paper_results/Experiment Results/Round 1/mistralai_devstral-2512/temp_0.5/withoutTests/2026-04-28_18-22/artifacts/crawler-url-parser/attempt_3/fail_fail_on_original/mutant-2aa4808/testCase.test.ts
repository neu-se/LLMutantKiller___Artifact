import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
  it("should correctly parse relative URLs when base URL contains authentication credentials", () => {
    const baseUrl = "http://user:pass@example.com/path";
    const relativeUrl = "relative";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://user:pass@example.com/relative");
    expect(result?.host).toBe("user:pass@example.com");
  });
});