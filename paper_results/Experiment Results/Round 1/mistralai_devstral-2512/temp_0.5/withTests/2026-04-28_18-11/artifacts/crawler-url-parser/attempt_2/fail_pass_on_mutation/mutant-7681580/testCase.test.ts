import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL", () => {
  it("should correctly handle URLs without protocol that start with a domain name", () => {
    const result = parse("example.com/path");
    expect(result?.url).toBe("http://example.com/path");
  });
});