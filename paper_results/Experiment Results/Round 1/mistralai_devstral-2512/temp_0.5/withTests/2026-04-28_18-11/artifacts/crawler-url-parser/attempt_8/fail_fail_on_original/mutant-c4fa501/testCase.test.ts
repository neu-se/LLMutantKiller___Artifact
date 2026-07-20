import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with directory index handling", () => {
  it("should normalize paths ending with index.htm when removeDirectoryIndex is true", () => {
    const result = parse("http://example.com/path/index.htm");
    expect(result?.path).toBe("/path/");
  });
});