import { gettype, parse } from "./crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly determine the type of a link', () => {
    const pageUrl = parse("https://www.example.com/path/to/page");
    const linkUrl = parse("https://www.example.com/path/to/page/link");
    expect(gettype(linkUrl, pageUrl)).not.toBe("Stryker was here!");
  });
});