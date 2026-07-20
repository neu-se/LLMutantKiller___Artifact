import { parse } from "./crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should return correct path for parsed URL", () => {
    const url = "https://www.example.com/path/to/resource";
    const parsedUrl = parse(url);
    expect(parsedUrl.path).toBe("/path/to/resource");
  });
});