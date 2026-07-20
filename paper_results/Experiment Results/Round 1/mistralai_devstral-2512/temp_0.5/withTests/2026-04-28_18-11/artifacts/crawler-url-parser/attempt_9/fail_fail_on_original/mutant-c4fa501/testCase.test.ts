import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with directory index handling", () => {
  it("should handle paths with index.htm consistently", () => {
    const result1 = parse("http://example.com/path/index.htm");
    const result2 = parse("http://example.com/path/");
    // These should be considered the same path when removeDirectoryIndex is true
    expect(result1?.path).toBe(result2?.path);
  });
});