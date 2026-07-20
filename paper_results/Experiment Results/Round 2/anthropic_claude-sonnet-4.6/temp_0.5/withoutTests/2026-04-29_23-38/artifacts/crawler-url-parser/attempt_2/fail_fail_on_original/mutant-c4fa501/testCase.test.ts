import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser parse", () => {
  it("should normalize directory index in returned URL when removeDirectoryIndex is true", () => {
    const result = parse("http://www.example.com/index.html");
    // With removeDirectoryIndex: true, the URL should be normalized to remove index.html
    expect(result?.url).toBe("http://www.example.com/");
  });
});