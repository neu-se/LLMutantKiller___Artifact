import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle URLs starting with a single character followed by colon", () => {
    const result = parse("a:test", undefined);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://a:test");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("a:test");
  });
});