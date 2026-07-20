import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL parsing behavior", () => {
  it("should correctly parse URLs with multiple query parameters containing special characters", () => {
    const url = "http://example.com/path?a=b&c=d&e=f";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?a=b&c=d&e=f");
    expect(result?.search).toBe("?a=b&c=d&e=f");
    expect(result?.querycount).toBe(3);
  });
});