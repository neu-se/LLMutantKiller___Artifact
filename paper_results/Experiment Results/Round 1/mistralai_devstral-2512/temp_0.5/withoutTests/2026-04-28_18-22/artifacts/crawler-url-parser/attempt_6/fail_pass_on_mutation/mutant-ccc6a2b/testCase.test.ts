import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should handle standard URLs correctly", () => {
    const result = parse("https://www.example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://www.example.com/path");
    expect(result?.protocol).toBe("https:");
    expect(result?.host).toBe("www.example.com");
    expect(result?.path).toBe("/path");
  });
});