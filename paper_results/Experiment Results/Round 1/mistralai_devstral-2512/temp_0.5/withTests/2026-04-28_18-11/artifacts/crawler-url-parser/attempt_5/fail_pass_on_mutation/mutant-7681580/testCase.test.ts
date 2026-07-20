import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL", () => {
  it("should correctly handle URLs starting with 'www.' without protocol", () => {
    const result = parse("www.example.com");
    expect(result?.url).toBe("http://www.example.com/");
  });
});