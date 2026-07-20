import { parse } from "./crawler-url-parser";

describe("crawler-url-parser", () => {
  it("should handle https protocol correctly", () => {
    const url = "https://www.example.com";
    const result = parse(url);
    expect(result.protocol).toBe("https:");
  });
});