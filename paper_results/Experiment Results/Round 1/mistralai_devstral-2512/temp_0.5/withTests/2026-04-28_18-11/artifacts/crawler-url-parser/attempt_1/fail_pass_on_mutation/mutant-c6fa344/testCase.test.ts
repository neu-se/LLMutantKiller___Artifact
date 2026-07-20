import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL", () => {
  it("should add http:// prefix to protocol-less URLs starting with //", () => {
    const result = parse("//example.com");
    expect(result?.url).toBe("http://example.com/");
  });
});