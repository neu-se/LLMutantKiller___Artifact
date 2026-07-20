import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL", () => {
  it("should correctly handle URLs starting with protocol-like strings", () => {
    const result = parse("httpexample.com");
    expect(result?.url).toBe("http://httpexample.com/");
  });
});