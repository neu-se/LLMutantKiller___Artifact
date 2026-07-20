import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function trailing slash behavior", () => {
  it("should handle trailing slashes according to removeTrailingSlash option", () => {
    const urlWithSlash = "http://example.com/path/";
    const result = parse(urlWithSlash);
    // This test checks the actual behavior of the normalize options
    // The original code should remove trailing slashes, mutated should preserve them
    expect(result?.url).toBe("http://example.com/path");
  });
});