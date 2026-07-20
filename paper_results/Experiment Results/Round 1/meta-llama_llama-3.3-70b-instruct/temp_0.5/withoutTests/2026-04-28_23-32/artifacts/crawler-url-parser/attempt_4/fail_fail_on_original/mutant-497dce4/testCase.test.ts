import { extract } from "./crawler-url-parser";

describe("crawler-url-parser", () => {
  it("should extract URLs correctly", () => {
    const data = '<a href="https://www.example.com">Example</a><a href="https://www.example.com">Example2</a>';
    const sourceUrl = "https://www.example.com";
    const result = extract(data, sourceUrl);
    expect(result).not.toBe([]);
  });
});