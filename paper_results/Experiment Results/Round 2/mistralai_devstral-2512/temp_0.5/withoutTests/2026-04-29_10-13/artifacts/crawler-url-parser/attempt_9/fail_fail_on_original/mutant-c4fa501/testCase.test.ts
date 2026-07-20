import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function directory index handling", () => {
  it("should remove directory index from paths when normalization is enabled", () => {
    const testUrl = "http://example.com/folder/index.html";
    const result = parse(testUrl);
    // This test assumes the normalization options are applied
    // With removeDirectoryIndex: true, path should be "/folder/"
    // With removeDirectoryIndex: false, path would remain "/folder/index.html"
    expect(result?.path).toBe("/folder/");
  });
});