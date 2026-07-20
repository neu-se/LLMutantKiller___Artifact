import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle relative URLs starting with protocol-relative double slash when no base URL is provided", () => {
    const result = parse("//example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.protocol).toBe("http:");
  });
});