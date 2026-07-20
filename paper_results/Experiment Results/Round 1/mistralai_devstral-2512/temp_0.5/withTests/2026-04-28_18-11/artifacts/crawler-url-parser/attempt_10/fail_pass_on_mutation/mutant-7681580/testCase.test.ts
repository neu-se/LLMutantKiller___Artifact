import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL", () => {
  it("should correctly handle URLs starting with 'a' without protocol", () => {
    const result = parse("a");
    expect(result?.url).toBe("http://a/");
  });
});