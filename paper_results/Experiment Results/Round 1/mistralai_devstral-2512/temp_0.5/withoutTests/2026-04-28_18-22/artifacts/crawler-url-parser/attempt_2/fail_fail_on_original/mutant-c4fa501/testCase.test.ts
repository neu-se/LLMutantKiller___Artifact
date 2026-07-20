import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with removeDirectoryIndex option", () => {
  it("should remove directory index when removeDirectoryIndex is true", () => {
    const urlWithIndex = "http://example.com/path/default.html";
    const result = parse(urlWithIndex);
    expect(result?.path).toBe("/path/");
  });
});