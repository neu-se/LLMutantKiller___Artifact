import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function fragment handling", () => {
  it("should correctly handle URLs with fragments containing exactly two characters followed by a dot and more characters", () => {
    const url = "http://example.com/path#ab.more";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.search).toBeNull();
  });
});