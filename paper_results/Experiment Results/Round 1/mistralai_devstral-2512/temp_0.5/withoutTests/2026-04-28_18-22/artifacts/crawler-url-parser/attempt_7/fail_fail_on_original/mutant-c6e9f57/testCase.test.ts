import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with URL normalization", () => {
  it("should normalize URLs according to configured options", () => {
    const url = "http://www.example.com/path/index.html?utm_source=test#section";
    const result = parse(url);

    expect(result).not.toBeNull();
    // These assertions would pass if normalization options were applied
    expect(result?.url).toBe("http://example.com/path/?utm_source=test");
    expect(result?.host).toBe("example.com");
    expect(result?.path).toBe("/path/");
  });
});