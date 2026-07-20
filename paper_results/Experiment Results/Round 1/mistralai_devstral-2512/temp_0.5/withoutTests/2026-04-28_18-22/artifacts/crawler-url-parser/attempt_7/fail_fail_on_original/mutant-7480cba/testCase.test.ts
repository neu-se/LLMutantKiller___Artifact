import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle URLs starting with protocol-like strings without double slashes", () => {
    const result = parse("http:/example.com", undefined);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://http:/example.com");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("http:/example.com");
  });
});