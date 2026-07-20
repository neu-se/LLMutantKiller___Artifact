import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL", () => {
  it("should correctly handle URLs starting with 'example' followed by colon", () => {
    const result = parse("example:test");
    expect(result?.url).toBe("http://example:test/");
  });
});