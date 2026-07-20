import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default.html page URL normalization", () => {
  it("should return 'internal' for link /foobar/baz.html compared to page /foo/default.html", () => {
    // Page URL: /foo/default.html -> pageurl_path normalized to "/foo/" (original) or "/foo" (mutated)
    // Link URL: /foobar/baz.html -> linkurl_path = "/foobar/baz.html"
    // linkurl_parts=["foobar","baz.html"], pageurl_parts=["foo"], diff=1
    // Original: "/foobar/baz.html".includes("/foo/") -> false -> "internal"
    // Mutated:  "/foobar/baz.html".includes("/foo")  -> true  -> "sublevel"
    const result = gettype("http://example.com/foobar/baz.html", "http://example.com/foo/default.html");
    expect(result).toBe("internal");
  });
});