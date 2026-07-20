import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function fragment handling", () => {
  it("should correctly handle URLs with empty fragments", () => {
    const urlWithEmptyFragment = "http://example.com/path#";
    const result = parse(urlWithEmptyFragment);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.search).toBeNull();
    expect(result?.path).toBe("/path");
  });
});