import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function path normalization", () => {
  it("should normalize paths with index files", () => {
    const url = "http://example.com/path/index.html";
    const result = parse(url);
    // If removeDirectoryIndex were properly implemented:
    // - Original (true) would normalize to "/path/"
    // - Mutated (false) would keep as "/path/index.html"
    expect(result?.path).toBe("/path/");
  });
});