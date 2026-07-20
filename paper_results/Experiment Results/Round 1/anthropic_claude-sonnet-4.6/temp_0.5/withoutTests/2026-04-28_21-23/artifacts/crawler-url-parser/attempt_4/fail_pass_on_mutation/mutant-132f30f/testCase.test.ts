import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser gettype with www URLs", () => {
  it("should correctly classify www subdomain relationship when comparing www and non-www versions", () => {
    // gettype uses subdomain length comparison
    // If stripWWW:true stripped www from parsed URLs, subdomain would be null (length 0)
    // If stripWWW:false kept www, subdomain would be 'www' (length 3)
    // This affects the updomain/subdomain classification
    const result = gettype("http://www.example.com/", "http://example.com/");
    // www.example.com has longer subdomain than example.com
    // so it should be "subdomain" not "updomain"
    expect(result).toBe("subdomain");
  });
});