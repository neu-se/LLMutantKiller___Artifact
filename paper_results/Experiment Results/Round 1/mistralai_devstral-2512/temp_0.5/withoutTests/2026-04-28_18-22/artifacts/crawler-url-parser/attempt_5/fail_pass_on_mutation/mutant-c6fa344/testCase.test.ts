import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle relative URLs that start with a protocol and colon but no slashes", () => {
    const result = parse("http:example.com/path", undefined);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http:example.com/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBeNull();
    expect(result?.path).toBe("example.com/path");
  });
});