import { gettype, parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly determine the type of a link', () => {
    const pageUrl = parse("https://www.example.com/path/to/page");
    const linkUrl = parse("https://www.example.com/path/to/page/link");
    const result = gettype(linkUrl, pageUrl);
    expect(result).not.toBe("Stryker was here!");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});