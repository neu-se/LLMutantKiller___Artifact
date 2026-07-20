import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly handle protocol-relative URL without base URL", () => {
    const result = parse("//example.com");
    expect(result).not.toBeNull();
    expect(result?.host).toBe("example.com");
    expect(result?.protocol).toBe("http:");
  });
});