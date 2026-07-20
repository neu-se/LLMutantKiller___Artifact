import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with stripWWW option", () => {
  it("should preserve 'www.' in the host when stripWWW is false", () => {
    const url = "http://www.example.com/path";
    const result = parse(url);
    expect(result?.host).toBe("www.example.com");
    expect(result?.url).toBe("http://www.example.com/path");
  });
});