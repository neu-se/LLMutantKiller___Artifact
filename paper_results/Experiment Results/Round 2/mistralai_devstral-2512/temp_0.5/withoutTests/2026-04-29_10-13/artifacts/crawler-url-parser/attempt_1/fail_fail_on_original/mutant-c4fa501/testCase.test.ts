import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with removeDirectoryIndex option", () => {
  it("should remove directory index when removeDirectoryIndex is true", () => {
    const url = "http://example.com/index.html";
    const result = parse(url);
    expect(result.path).toBe("/");
  });
});