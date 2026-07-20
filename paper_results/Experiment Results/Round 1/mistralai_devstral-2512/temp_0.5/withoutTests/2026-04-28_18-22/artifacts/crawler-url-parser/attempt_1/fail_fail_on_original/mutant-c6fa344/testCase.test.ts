import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle relative URLs starting with a single slash when no base URL is provided", () => {
    const result = parse("/path/to/resource", undefined);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http:///path/to/resource");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("");
    expect(result?.path).toBe("/path/to/resource");
  });
});