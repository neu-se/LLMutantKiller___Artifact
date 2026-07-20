import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle relative URLs that start with a protocol-like string", () => {
    const result = parse("ftp:example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://ftp:example.com/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("ftp:example.com");
  });
});