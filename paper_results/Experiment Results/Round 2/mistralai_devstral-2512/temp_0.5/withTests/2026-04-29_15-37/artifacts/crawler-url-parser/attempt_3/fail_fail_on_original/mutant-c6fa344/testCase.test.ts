import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL mutation test", () => {
  it("should correctly handle protocol-less URLs with leading colon", () => {
    const result = parse("http:example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://http:example.com/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("http:example.com");
  });
});