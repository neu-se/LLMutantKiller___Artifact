import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should return internal for index.html link on same domain without matching path", () => {
    // Testing edge case where removeDirectoryIndex affects path part counting
    const result = gettype(
      "http://www.example.com/section/index.html",
      "http://www.example.com/section/"
    );
    expect(result).toBe("samelevel");
  });
});