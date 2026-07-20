import { gettype, parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly determine the type of a link', () => {
    const pageUrl = "https://www.example.com/path/to/page";
    const linkUrl = "https://www.example.com/path/to/page/link";
    const pageUrlParsed = parse(pageUrl);
    const linkUrlParsed = parse(linkUrl);
    const type = gettype(linkUrlParsed, pageUrlParsed);
    expect(type).toBe("sublevel");
  });
});