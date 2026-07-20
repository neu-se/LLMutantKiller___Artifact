import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse with baseUrlStr containing fragment", () => {
  it("should strip entire fragment from baseUrlStr when fragment has multiple characters", () => {
    // baseUrlStr = "http://example.com/path#section-two"
    // Original /#.*$/ -> "http://example.com/path"
    // Mutated  /#.$/ removes "#s" -> "http://example.com/pathection-two"
    //
    // Resolving relative "file.html" against these:
    // Original: URL.resolve("http://example.com/path", "file.html") = "http://example.com/file.html"
    // Mutated:  URL.resolve("http://example.com/pathection-two", "file.html") = "http://example.com/file.html"
    // Same! Because resolve replaces last segment.
    //
    // But what about the baseurl field returned?
    // ret.baseurl = URL.format(parsedBaseUrl) where parsedBaseUrl = URL.parse(baseUrlStr)
    // Original baseurl: "http://example.com/path"
    // Mutated baseurl:  "http://example.com/pathection-two"

    const result = parse("file.html", "http://example.com/path#section-two");

    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("http://example.com/path");
  });
});