import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly parse a bare domain without protocol", () => {
    const result = parse("example.com");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/");
    expect(result!.protocol).toBe("http:");
    expect(result!.host).toBe("example.com");
    expect(result!.domain).toBe("example.com");
  });
});