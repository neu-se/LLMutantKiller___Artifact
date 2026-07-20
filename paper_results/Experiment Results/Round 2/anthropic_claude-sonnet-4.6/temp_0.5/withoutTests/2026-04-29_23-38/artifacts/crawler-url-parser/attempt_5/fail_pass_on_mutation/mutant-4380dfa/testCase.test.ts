import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should parse protocol-relative URL by adding http protocol", () => {
    const result = parse("//example.com");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
    expect(result?.url).toMatch(/^http:\/\//);
  });
});