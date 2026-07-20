import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should return internal not sublevel when link path shares prefix but not directory with page index", () => {
    // pageurl_path after replace: original="/foo/" mutated="/foo"
    // linkurl_path="/foobar/something" includes "/foo" but not "/foo/"
    // original: not sublevel -> internal
    // mutated: sublevel (false positive due to missing trailing slash)
    const result = gettype(
      "http://example.com/foobar/something",
      "http://example.com/foo/index.html"
    );
    expect(result).toBe("internal");
  });
});