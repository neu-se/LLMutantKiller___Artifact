import { parse } from "./crawler-url-parser";

describe("crawler-url-parser", () => {
  it("should handle http protocol correctly", () => {
    const url = "http://www.example.com";
    const result = parse(url);
    expect(result.protocol).toBe("http:");
  });
});