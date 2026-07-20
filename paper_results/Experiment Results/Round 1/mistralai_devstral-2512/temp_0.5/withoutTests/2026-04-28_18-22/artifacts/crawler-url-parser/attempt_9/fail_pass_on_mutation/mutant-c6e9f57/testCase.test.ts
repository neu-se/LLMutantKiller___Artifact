import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with URL processing", () => {
  it("should process URLs according to expected behavior", () => {
    const url = "http://www.example.com/path/index.html?utm_source=test#section";
    const result = parse(url);

    expect(result).not.toBeNull();
    // These assertions test the actual behavior of the parse function
    expect(result?.url).toBe("http://www.example.com/path/index.html?utm_source=test");
    expect(result?.host).toBe("www.example.com");
    expect(result?.path).toBe("/path/index.html");
    expect(result?.search).toBe("?utm_source=test");
  });
});