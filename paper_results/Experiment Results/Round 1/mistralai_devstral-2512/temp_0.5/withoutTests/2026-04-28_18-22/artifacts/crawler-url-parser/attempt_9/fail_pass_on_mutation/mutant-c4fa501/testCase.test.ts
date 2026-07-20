import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with directory index handling", () => {
  it("should handle URLs with index files consistently", () => {
    const urlWithIndex = "http://example.com/path/index.html";
    const result = parse(urlWithIndex);
    // The path should contain "index.html" when removeDirectoryIndex is false (mutated)
    // and should not contain it when removeDirectoryIndex is true (original)
    expect(result?.path).toContain("index.html");
  });
});