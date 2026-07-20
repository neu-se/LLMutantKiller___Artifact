import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with index.html in pageurl path", () => {
  it("should correctly classify link as uplevel when pageurl contains index.html", () => {
    // pageurl_path = /aaa/bbb/index.html
    // Original: after replace -> /aaa/bbb/  (includes /aaa/ -> uplevel)
    // Mutated:  after replace -> /aaa/bbb   (does NOT include /aaa/ -> internal)
    const result = gettype(
      "http://example.com/aaa/",
      "http://example.com/aaa/bbb/index.html"
    );
    expect(result).toBe("uplevel");
  });
});