import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly parse a URL", () => {
    const result = parse("http://example.com/path");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("example.com");
    expect(result!.domain).toBe("example.com");
    expect(result!.path).toBe("/path");
    expect(result!.protocol).toBe("http:");
    expect(result!.url).toBe("http://example.com/path");
    expect(result!.querycount).toBe(0);
    expect(result!.search).toBeNull();
    expect(result!.subdomain).toBeNull();
  });
});