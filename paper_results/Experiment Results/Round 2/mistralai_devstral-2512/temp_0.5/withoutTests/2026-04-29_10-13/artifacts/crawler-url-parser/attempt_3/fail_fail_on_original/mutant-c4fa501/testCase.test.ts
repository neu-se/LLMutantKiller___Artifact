import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with removeDirectoryIndex option", () => {
  it("should handle default.html files correctly", () => {
    const url = "http://example.com/path/default.html";
    const result = parse(url);
    expect(result?.path).toBe("/path/");
  });
});