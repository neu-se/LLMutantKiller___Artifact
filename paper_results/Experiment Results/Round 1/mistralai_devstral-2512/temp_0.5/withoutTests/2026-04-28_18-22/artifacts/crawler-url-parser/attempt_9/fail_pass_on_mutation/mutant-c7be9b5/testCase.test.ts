import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should handle valid HTTPS URLs correctly", () => {
    const url = "https://www.example.com/path";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("https:");
    expect(result?.host).toBe("www.example.com");
    expect(result?.path).toBe("/path");
  });
});