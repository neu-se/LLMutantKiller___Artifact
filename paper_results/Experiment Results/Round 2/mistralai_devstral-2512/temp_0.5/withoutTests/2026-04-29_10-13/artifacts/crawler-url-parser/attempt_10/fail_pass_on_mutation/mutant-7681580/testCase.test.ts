import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle URLs with protocol-like prefix in the middle", () => {
    const result = parse("example.com/http://path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/http://path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
  });
});