import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function directory index handling", () => {
  it("should handle directory index files consistently", () => {
    const url1 = "http://example.com/path/index.html";
    const url2 = "http://example.com/path/";
    const result1 = parse(url1);
    const result2 = parse(url2);
    // This test checks if both URLs are treated the same way
    // With removeDirectoryIndex: true, both should have path "/path/"
    // With removeDirectoryIndex: false, they would have different paths
    expect(result1?.path).toBe(result2?.path);
  });
});