import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly parse URLs with authentication credentials", () => {
    const urlWithAuth = "http://user:pass@example.com/path";
    const result = parse(urlWithAuth);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://user:pass@example.com/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("user:pass@example.com");
    expect(result?.path).toBe("/path");
  });
});