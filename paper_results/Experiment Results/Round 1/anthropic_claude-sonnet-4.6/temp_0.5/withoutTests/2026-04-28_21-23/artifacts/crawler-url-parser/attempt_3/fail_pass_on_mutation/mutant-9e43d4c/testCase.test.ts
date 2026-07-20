import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("correctly parses URL components including host and domain", () => {
    const result = parse("http://sub.example.com/path/page");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("sub.example.com");
    expect(result!.domain).toBe("example.com");
    expect(result!.subdomain).toBe("sub");
    expect(result!.protocol).toBe("http:");
    expect(result!.path).toBe("/path/page");
  });
});