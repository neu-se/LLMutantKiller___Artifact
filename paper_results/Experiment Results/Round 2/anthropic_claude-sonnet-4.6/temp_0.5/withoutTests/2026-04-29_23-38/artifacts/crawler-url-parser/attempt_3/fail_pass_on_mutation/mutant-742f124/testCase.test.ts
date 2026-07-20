import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should strip fragment from URL containing hash", () => {
    // parse() manually does: currentUrlStr = currentUrlStr.replace(/#.*$/, '');
    // and delete parsedUrl.hash
    // The result_normalize_options.stripFragment doesn't affect parse() directly
    // but let's verify the URL returned has no fragment
    const result = parse("http://example.com/page#anchor");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/page");
  });
});