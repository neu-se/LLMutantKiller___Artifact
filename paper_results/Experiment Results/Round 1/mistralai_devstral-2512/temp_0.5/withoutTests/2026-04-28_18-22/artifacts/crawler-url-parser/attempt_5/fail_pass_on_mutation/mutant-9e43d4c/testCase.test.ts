import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL parsing behavior", () => {
  it("should correctly parse URLs with query parameters containing equals signs", () => {
    const url = "http://example.com/path?param=value=extra";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param=value=extra");
    expect(result?.search).toBe("?param=value=extra");
    expect(result?.querycount).toBe(2);
  });
});