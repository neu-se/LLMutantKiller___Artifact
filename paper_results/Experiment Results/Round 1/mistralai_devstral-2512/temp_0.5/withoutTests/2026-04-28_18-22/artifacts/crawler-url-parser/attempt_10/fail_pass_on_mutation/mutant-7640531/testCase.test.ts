import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function fragment handling", () => {
  it("should correctly handle URLs with fragments containing only a question mark", () => {
    const urlWithFragment = "http://example.com/path#?";
    const result = parse(urlWithFragment);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.path).toBe("/path");
    expect(result?.search).toBeNull();
  });
});