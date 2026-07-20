import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL parsing behavior", () => {
  it("should correctly handle URLs with query parameters containing special characters", () => {
    const url = "http://example.com/path?param=value&other=test%20value";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param=value&other=test%20value");
    expect(result?.search).toBe("?param=value&other=test%20value");
    expect(result?.querycount).toBe(2);
  });
});