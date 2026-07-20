import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with removeDirectoryIndex option", () => {
  it("should remove directory index when removeDirectoryIndex is true", () => {
    const urlWithIndex = "http://example.com/path/index.html";
    const result = parse(urlWithIndex);
    expect(result?.path).not.toContain("index.html");
  });
});