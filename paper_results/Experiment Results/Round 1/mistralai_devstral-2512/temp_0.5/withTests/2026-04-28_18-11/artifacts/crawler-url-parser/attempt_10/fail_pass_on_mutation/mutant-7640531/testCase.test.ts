import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with fragment containing hash symbol", () => {
  it("should correctly handle URLs with hash symbols in fragments", () => {
    const result = parse("http://example.com/path#section#subsection");
    // The original code should remove everything after first #, leaving just the path
    // The mutated code would incorrectly keep everything up to the last #
    expect(result?.url).toBe("http://example.com/path");
  });
});