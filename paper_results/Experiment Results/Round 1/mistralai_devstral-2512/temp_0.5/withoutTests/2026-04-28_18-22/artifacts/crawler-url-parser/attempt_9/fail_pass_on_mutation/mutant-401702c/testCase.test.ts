import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle relative URLs starting with a protocol-like string with special characters", () => {
    const result = parse("http:/example.com/path", "http://base.com");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://base.com/example.com/path");
  });
});