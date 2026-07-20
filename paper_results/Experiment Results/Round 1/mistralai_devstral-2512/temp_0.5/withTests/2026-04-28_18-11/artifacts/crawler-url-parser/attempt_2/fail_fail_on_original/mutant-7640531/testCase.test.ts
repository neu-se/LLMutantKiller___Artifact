import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with fragment containing hash symbol", () => {
  it("should correctly handle URLs with hash symbols in fragments", () => {
    const result = parse("http://example.com/path#section#subsection");
    expect(result.url).toBe("http://example.com/path#section");
  });
});