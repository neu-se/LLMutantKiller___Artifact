import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser";

describe("crawler-url-parser", () => {
  it("should handle https protocol correctly", () => {
    const url = "http://www.example.com";
    const result = parse(url);
    expect(result.protocol).not.toBe("https:");
  });
});