import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly parse a URL that goes through the else branch", () => {
    const result = parse("//example.com/path", "http://base.com");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
  });
});