import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with removeDirectoryIndex option", () => {
  it("should handle URLs with directory index files", () => {
    const urlWithIndex = "http://example.com/path/";
    const result = parse(urlWithIndex);
    expect(result?.path).toBe("/path/");
  });
});