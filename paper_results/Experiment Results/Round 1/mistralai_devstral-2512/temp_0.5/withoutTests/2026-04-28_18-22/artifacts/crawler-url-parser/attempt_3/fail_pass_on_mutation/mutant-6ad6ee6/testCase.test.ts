import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function fragment handling", () => {
  it("should correctly handle URLs with fragments containing multiple characters", () => {
    const url = "http://example.com/path#abc";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.search).toBeNull();
  });
});