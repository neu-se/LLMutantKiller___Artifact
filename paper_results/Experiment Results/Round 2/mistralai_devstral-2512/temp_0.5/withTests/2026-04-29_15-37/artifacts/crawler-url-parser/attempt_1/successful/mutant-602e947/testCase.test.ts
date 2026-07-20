import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with localhost URL", () => {
  it("should correctly handle localhost URLs without protocol", () => {
    const result = parse("localhost:8080/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://localhost:8080/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("localhost:8080");
    expect(result?.path).toBe("/path");
  });
});