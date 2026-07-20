import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL", () => {
  it("should correctly handle URLs starting with protocol-like strings followed by single slash", () => {
    const result = parse("http:/example.com");
    expect(result?.url).toBe("http://example.com/");
  });
});