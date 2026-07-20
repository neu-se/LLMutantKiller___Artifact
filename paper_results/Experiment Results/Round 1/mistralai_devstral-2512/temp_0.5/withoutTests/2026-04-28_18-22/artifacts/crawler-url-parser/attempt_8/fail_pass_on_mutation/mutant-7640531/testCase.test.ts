import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function fragment handling", () => {
  it("should correctly handle URLs with fragments containing query parameters", () => {
    const urlWithFragment = "http://example.com/path#?query=param";
    const result = parse(urlWithFragment);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.path).toBe("/path");
    expect(result?.search).toBeNull();
  });
});