import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should treat index.html path as equivalent to root when comparing types", () => {
    // With removeDirectoryIndex: true, /index.html normalizes to /
    // so comparing /index.html (linkurl) to /about/ (pageurl) should be uplevel
    // With removeDirectoryIndex: false, /index.html stays as /index.html
    // making it appear as a file at root level vs /about/ directory
    const result = gettype("http://www.example.com/index.html", "http://www.example.com/about/index.html");
    expect(result).toBe("uplevel");
  });
});