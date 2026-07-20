import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly parse URLs and verify module execution behavior", () => {
    const result = parse("http://example.com/test");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/test");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
    expect(result?.path).toBe("/test");
  });
});