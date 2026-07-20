import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL normalization", () => {
  it("should normalize URLs by removing directory index when options are configured", () => {
    const url = "http://example.com/path/index.html";
    const result = parse(url);

    expect(result).not.toBeNull();
    // This would pass if removeDirectoryIndex was true in the options
    expect(result?.path).toBe("/path/");
  });
});