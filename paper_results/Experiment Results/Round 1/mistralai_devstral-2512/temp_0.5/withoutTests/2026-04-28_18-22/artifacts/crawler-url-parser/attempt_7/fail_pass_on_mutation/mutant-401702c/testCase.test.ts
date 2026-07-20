import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle relative URLs starting with a protocol-like string with special characters", () => {
    const result = parse("file:/example.com/path", "http://base.com");
    expect(result).toBeNull();
  });
});