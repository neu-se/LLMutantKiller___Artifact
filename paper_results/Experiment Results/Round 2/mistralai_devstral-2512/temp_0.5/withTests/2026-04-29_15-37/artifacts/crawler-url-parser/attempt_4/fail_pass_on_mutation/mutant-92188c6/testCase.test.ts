import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with URL query parameters", () => {
  it("should properly parse query string when parseQueryString is true", () => {
    const url = "http://example.com/path?q1=value1&q2=value2";
    const result = parse(url);
    expect(result.search).toBe("?q1=value1&q2=value2");
    expect(result.querycount).toBe(2);
    // This assertion will fail with the mutated code because URL.parse with false won't parse query string
    expect(result.url.includes("q1=value1")).toBe(true);
    expect(result.url.includes("q2=value2")).toBe(true);
  });
});