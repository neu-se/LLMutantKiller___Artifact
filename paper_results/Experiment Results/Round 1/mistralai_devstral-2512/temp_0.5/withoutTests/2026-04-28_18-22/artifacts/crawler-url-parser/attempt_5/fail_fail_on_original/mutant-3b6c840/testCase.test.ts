import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL normalization", () => {
  it("should normalize URLs with trailing slashes consistently", () => {
    const url1 = "http://example.com/path/";
    const url2 = "http://example.com/path";
    const result1 = parse(url1);
    const result2 = parse(url2);

    // The original code should normalize these to the same URL
    // The mutated code would keep them different
    expect(result1?.url).toBe(result2?.url);
  });
});