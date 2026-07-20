import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should set baseurl correctly for relative URL", () => {
    const result = parse("page?a=1", "http://example.com/base/?x=1");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("http://example.com/base/?x=1");
  });
});