import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with index.html in pageurl", () => {
  it("should return uplevel when linkurl is parent directory of pageurl containing index.html", () => {
    const result = gettype(
      "http://example.com/foo/",
      "http://example.com/foo/bar/index.html"
    );
    expect(result).toBe("uplevel");
  });
});