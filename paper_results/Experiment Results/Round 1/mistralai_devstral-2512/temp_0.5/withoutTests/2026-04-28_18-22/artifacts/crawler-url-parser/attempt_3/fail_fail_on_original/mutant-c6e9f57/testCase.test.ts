import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol normalization", () => {
  it("should normalize protocol to https when http is used and normalizeProtocol is true", () => {
    const url = "http://example.com/path";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("https:");
    expect(result?.url).toBe("https://example.com/path");
  });
});