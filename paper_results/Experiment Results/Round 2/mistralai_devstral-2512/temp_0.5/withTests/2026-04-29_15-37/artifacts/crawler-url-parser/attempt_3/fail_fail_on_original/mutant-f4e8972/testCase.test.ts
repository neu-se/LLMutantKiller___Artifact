import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function data type handling", () => {
  it("should handle string input differently from non-string input", () => {
    const htmlString = '<a href="http://test.com">Test</a>';
    const nonStringData = { fake: "object" };

    const stringResult = extract(htmlString, "http://base.com");
    const nonStringResult = extract(nonStringData as any, "http://base.com");

    expect(stringResult.length).toBeGreaterThan(0);
    expect(nonStringResult.length).toBe(0);
  });
});