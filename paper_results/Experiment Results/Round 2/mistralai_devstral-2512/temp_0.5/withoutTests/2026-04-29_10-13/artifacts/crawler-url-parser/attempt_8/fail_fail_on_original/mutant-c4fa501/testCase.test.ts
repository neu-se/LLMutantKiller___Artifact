import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with directory index normalization", () => {
  it("should normalize directory index files in URLs", () => {
    const url = "http://example.com/path/index.html";
    const result = parse(url);
    // This would pass with removeDirectoryIndex: true
    // and fail with removeDirectoryIndex: false
    expect(result?.path).toBe("/path/");
  });
});