import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype", () => {
  it("should return internal when link is two levels above page on same host", () => {
    const result = gettype("http://example.com/aaa/", "http://example.com/aaa/bbb/ccc/");
    expect(result).toBe("internal");
  });
});