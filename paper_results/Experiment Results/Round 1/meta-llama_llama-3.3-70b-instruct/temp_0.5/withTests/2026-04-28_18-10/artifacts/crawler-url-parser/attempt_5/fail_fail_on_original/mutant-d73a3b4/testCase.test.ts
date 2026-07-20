import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
  it('should correctly handle url with index.html', () => {
    const url = "http://example.com/path/index.html";
    const parsedUrl = parse(url);
    if (parsedUrl) {
      expect(parsedUrl.url).toBe("http://example.com/path/");
    }
  });

  it('should correctly handle url with default.html', () => {
    const url = "http://example.com/path/default.html";
    const parsedUrl = parse(url);
    if (parsedUrl) {
      expect(parsedUrl.url).toBe("http://example.com/path/");
    }
  });
});