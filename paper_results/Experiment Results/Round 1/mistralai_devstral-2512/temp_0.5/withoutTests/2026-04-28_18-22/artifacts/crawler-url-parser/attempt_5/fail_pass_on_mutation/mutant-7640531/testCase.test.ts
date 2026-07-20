import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function fragment handling", () => {
  it("should correctly handle URLs with fragments containing question marks", () => {
    const urlWithFragmentQuestionMark = "http://example.com/path#section?param=value";
    const result = parse(urlWithFragmentQuestionMark);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.search).toBeNull();
    expect(result?.path).toBe("/path");
  });
});