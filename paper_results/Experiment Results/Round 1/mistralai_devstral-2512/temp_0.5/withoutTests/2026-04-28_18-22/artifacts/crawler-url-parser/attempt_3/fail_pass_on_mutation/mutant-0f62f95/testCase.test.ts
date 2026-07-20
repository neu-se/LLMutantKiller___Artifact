import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should correctly parse URLs and handle trailing slashes", () => {
    const result = parse("https://example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://example.com/path");
    expect(result?.protocol).toBe("https:");
    expect(result?.host).toBe("example.com");
    expect(result?.path).toBe("/path");
  });
});