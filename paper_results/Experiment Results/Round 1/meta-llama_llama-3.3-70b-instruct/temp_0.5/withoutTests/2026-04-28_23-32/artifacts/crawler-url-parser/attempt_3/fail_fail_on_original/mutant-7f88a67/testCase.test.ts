import { parse } from "./crawler-url-parser";

describe("crawler-url-parser", () => {
  it("should handle https protocol correctly", () => {
    const originalUrl = "https://www.example.com";
    const result = parse(originalUrl);
    expect(result.protocol).toBe("https:");
    const mutatedUrl = "http://www.example.com";
    const mutatedResult = parse(mutatedUrl);
    expect(mutatedResult.protocol).toBe("http:");
  });
});