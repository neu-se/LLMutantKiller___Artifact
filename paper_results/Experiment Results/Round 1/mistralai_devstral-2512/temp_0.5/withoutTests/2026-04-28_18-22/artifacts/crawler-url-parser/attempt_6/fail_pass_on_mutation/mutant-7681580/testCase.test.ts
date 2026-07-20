import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle URLs starting with a single slash by not adding http:// prefix", () => {
    const result = parse("/absolute/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("/absolute/path");
    expect(result?.protocol).toBeNull();
  });
});