import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with baseUrl containing hash", () => {
  it("should correctly handle baseUrl with multiple characters after hash", () => {
    const baseUrl = "http://example.com/path#multiple";
    const currentUrl = "/relative";
    const result = parse(currentUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/relative");
    expect(result?.baseurl).toBe("http://example.com/path");
  });
});