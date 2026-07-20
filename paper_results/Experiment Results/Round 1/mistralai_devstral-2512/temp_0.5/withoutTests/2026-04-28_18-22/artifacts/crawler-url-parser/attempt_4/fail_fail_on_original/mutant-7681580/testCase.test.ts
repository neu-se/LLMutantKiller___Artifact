import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle relative URLs starting with a dot by adding http:// prefix", () => {
    const result = parse("./relative/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://./relative/path");
    expect(result?.protocol).toBe("http:");
  });
});