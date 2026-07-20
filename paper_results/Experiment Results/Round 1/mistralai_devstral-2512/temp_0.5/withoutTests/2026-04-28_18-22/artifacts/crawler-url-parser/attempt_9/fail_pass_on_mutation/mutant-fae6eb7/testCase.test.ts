import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with baseUrl containing fragment", () => {
  it("should correctly handle baseUrl with fragment when currentUrl is relative and fragment ends with hash", () => {
    const baseUrl = "http://example.com/path#fragment#";
    const currentUrl = "/relative";
    const result = parse(currentUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/relative");
    expect(result?.baseurl).toBe("http://example.com/path");
  });
});