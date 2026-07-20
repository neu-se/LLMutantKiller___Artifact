import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol handling", () => {
  it("should correctly handle URLs without protocol but starting with single character followed by colon", () => {
    const result = parse("h:example.com", "http://base.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://base.com/h:example.com");
  });
});