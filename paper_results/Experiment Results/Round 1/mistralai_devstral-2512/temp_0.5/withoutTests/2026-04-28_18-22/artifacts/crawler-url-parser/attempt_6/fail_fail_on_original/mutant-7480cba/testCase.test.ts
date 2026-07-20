import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle URLs starting with single character followed by colon and slashes", () => {
    const result = parse("a://example.com", undefined);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("a://example.com");
    expect(result?.protocol).toBe("a:");
    expect(result?.host).toBe("example.com");
  });
});