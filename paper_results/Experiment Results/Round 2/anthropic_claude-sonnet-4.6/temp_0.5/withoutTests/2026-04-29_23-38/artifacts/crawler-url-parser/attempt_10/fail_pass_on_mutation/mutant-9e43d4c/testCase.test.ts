import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly parse a URL with double-slash notation", () => {
    const result = parse("//example.com/path");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("example.com");
    expect(result!.domain).toBe("example.com");
    expect(result!.path).toBe("/path");
    expect(result!.url).toBe("http://example.com/path");
  });
});