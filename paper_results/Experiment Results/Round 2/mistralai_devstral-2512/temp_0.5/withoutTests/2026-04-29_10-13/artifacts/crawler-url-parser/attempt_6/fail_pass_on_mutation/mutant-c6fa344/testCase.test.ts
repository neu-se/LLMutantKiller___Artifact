import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle URLs without protocol but with www prefix when baseUrl is not provided", () => {
    const result = parse("www.example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://www.example.com/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("www.example.com");
  });
});