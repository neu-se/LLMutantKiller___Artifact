import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle URLs starting with protocol-like strings in the middle", () => {
    const result = parse("examplehttp://.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://examplehttp://.com/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("examplehttp://.com");
  });
});