import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function trailing slash behavior", () => {
  it("should normalize URLs by removing trailing slashes", () => {
    const url1 = "http://example.com/path/";
    const url2 = "http://example.com/path";
    const result1 = parse(url1);
    const result2 = parse(url2);
    expect(result1?.url).toBe(result2?.url);
    expect(result1?.path).toBe(result2?.path);
  });
});