import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle URLs starting with single character protocol without slashes", () => {
    const result = parse("h:example.com", undefined);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://h:example.com");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("h:example.com");
  });
});