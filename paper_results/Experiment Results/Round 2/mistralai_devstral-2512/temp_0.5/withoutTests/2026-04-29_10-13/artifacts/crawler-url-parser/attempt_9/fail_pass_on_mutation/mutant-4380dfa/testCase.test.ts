import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol handling", () => {
  it("should add http:// protocol to URLs starting with //", () => {
    const result = parse("//example.com/path");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
    expect(result?.url).toBe("http://example.com/path");
  });
});