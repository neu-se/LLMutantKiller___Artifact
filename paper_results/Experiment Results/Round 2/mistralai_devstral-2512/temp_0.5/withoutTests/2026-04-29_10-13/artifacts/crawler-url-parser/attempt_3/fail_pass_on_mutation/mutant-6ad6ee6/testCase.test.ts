import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle URLs with fragments containing multiple characters", () => {
    const urlWithFragment = "http://example.com/path#abc";
    const result = parse(urlWithFragment);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.search).toBeNull();
  });
});