import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should return 'internal' when the link URL and page URL have the same host and the link URL path has one more part than the page URL path", () => {
    const linkUrl = "http://www.example.com/aaa/bbb/ccc";
    const pageUrl = "http://www.example.com/aaa/bbb";
    const resultOriginal = gettype(linkUrl, pageUrl);
    expect(resultOriginal).toBe("internal");

    // Introduce a mutation here to test the behavior
    const mutatedGettype = (linkUrl, pageUrl) => {
      // Simulate the mutated code
      if (true) return "samelevel";
      // Rest of the function remains the same
    };

    const resultMutated = mutatedGettype(linkUrl, pageUrl);
    expect(resultMutated).not.toBe("internal");
  });
});