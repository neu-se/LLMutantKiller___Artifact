import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly handle a URL that goes through the no-base-URL code path", () => {
    // A bare hostname without protocol goes through the inner if block
    // The regex should prepend http:// exactly once
    const result = parse("example.com");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
    // Verify the URL doesn't have double slashes indicating double-prepend
    expect(result?.url).not.toMatch(/http:\/\/\/\//);
  });
});