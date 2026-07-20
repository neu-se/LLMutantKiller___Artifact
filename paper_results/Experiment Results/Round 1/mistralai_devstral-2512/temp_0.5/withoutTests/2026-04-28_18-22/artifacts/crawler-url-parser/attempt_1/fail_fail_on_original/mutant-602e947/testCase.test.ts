import { parse } from "./crawler-url-parser.js";

describe("parse function with URL normalization", () => {
  it("should correctly handle URLs without protocol when baseUrl is not provided", () => {
    const url = "localhost:3000/path";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://localhost:3000/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("localhost:3000");
  });
});