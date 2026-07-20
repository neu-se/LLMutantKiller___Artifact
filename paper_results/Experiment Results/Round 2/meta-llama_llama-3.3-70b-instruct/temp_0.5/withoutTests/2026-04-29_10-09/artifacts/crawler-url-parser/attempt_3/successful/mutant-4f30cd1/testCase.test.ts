import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should correctly handle hrefs with length less than 3 and not javascript protocol", () => {
    const data = '<a href="ab">Link</a>';
    const sourceUrl = "http://example.com";
    const resultOriginal = extract(data, sourceUrl);
    expect(resultOriginal.length).toBe(0);
    // This test case should pass on the original code
    // and fail on the mutated code because the mutated code
    // will not filter out the href with length less than 3
    // when it's not a javascript protocol
  });
});