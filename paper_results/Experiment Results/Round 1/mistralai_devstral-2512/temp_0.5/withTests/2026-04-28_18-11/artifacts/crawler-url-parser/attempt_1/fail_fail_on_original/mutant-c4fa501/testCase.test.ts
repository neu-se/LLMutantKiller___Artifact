import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with directory index handling", () => {
  it("should normalize paths ending with index.html to parent directory", () => {
    const result = parse("http://example.com/path/index.html");
    expect(result.path).toBe("/path/");
  });
});