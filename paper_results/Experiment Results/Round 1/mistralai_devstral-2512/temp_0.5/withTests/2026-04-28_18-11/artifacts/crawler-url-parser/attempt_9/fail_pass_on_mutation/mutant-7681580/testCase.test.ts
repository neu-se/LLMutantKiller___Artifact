import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL", () => {
  it("should correctly handle URLs starting with 'example' without protocol", () => {
    const result = parse("example/path");
    expect(result?.url).toBe("http://example/path");
  });
});