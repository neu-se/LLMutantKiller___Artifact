import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should return valid result with correct host for protocol-relative URL", () => {
    const result = parse("//example.com");
    expect(result).not.toBeNull();
    expect(result?.host).toBe("example.com");
  });
});