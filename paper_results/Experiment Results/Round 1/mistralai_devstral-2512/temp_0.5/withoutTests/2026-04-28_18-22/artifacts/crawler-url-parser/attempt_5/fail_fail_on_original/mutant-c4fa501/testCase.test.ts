import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with removeDirectoryIndex option", () => {
  it("should normalize URLs with default directory index files", () => {
    const urlWithDefaultIndex = "http://example.com/path/default.html";
    const result = parse(urlWithDefaultIndex);
    expect(result?.path).toBe("/path/");
  });
});