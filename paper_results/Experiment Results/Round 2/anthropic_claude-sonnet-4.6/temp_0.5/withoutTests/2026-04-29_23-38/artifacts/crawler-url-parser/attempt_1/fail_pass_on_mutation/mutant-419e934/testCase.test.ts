import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe("gettype with index.html pageurl", () => {
  it("should return uplevel when linkurl is parent of pageurl with index.html", () => {
    const result = gettype("http://example.com/aaa/", "http://example.com/aaa/bbb/index.html");
    expect(result).toBe("uplevel");
  });
});