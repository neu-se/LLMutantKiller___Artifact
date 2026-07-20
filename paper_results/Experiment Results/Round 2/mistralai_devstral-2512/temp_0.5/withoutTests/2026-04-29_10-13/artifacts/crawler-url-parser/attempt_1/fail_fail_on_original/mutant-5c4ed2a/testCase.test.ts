import { parse } from "./crawler-url-parser.js";

describe("parse function with baseUrl containing hash", () => {
  it("should correctly handle baseUrl with hash followed by multiple characters", () => {
    const currentUrl = "page.html";
    const baseUrl = "http://example.com#section1";
    const result = parse(currentUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.baseurl).toBe("http://example.com/");
    expect(result?.url).toBe("http://example.com/page.html");
  });
});