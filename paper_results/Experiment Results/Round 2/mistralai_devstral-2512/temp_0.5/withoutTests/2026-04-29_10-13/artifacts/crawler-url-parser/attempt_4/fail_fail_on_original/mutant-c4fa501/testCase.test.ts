import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with removeDirectoryIndex option", () => {
  it("should handle index.php files correctly", () => {
    const url = "http://example.com/path/index.php";
    const result = parse(url);
    expect(result?.path).toBe("/path/");
  });
});