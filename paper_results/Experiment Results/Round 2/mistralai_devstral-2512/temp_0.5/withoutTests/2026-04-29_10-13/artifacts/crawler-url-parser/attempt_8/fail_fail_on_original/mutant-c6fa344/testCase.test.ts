import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle URLs without protocol but starting with a dot when baseUrl is not provided", () => {
    const result = parse("./path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http:///path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBeNull();
  });
});