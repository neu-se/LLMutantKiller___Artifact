import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL", () => {
  it("should correctly handle URLs starting with 'http:' followed by content", () => {
    const result = parse("http:example.com/path");
    expect(result?.url).toBe("http://http:example.com/path");
  });
});