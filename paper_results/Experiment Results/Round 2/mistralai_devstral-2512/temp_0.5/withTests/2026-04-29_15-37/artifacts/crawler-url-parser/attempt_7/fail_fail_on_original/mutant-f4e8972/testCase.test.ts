import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function input type handling", () => {
  it("should differentiate between string and non-string input types", () => {
    const htmlString = '<html><body><a href="http://example.com">Link</a></body></html>';
    const nonStringInput = { not: "a string" };

    const stringResult = extract(htmlString, "http://base.com");
    const nonStringResult = extract(nonStringInput as any, "http://base.com");

    expect(stringResult.length).toBeGreaterThan(0);
    expect(nonStringResult).toBeDefined();
  });
});