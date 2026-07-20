import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with URL normalization", () => {
  it("should correctly handle localhost URLs without protocol when baseUrl is not provided", () => {
    const url = "localhost:8080/path";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://localhost:8080/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("localhost:8080");
  });
});