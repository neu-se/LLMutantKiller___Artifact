import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
  it('should correctly handle url with index.html and default.html', () => {
    const url1 = "http://example.com/path/index.html";
    const url2 = "http://example.com/path/default.html";
    const parsedUrl1 = parse(url1);
    const parsedUrl2 = parse(url2);
    if (parsedUrl1 && parsedUrl2) {
      expect(parsedUrl1.url).toBe("http://example.com/path/index.html");
      expect(parsedUrl2.url).toBe("http://example.com/path/default.html");
    }
  });

  it('should correctly handle url with trailing slash', () => {
    const url = "http://example.com/path/";
    const parsedUrl = parse(url);
    if (parsedUrl) {
      expect(parsedUrl.url).toBe("http://example.com/path/");
    }
  });
});