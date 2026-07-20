import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse trailing slash", () => {
  it("should remove trailing slash from path", () => {
    const result = parse("http://example.com/path/");
    expect(result.url).toBe("http://example.com/path");
  });
});