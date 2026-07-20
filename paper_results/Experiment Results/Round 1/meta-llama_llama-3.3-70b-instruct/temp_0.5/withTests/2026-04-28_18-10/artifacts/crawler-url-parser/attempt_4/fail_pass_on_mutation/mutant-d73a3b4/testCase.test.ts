import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
  it('should return different url for index.html and default.html without trailing slash', () => {
    const url1 = "http://example.com/path/index.html";
    const url2 = "http://example.com/path/default.html";
    const parsedUrl1 = parse(url1);
    const parsedUrl2 = parse(url2);
    if (parsedUrl1 && parsedUrl2) {
      expect(parsedUrl1.url).toBe("http://example.com/path/index.html");
      expect(parsedUrl2.url).toBe("http://example.com/path/default.html");
    }
  });

  it('should return same url for index.html and default.html with trailing slash', () => {
    const url1 = "http://example.com/path/";
    const url2 = "http://example.com/path/";
    const parsedUrl1 = parse(url1);
    const parsedUrl2 = parse(url2);
    if (parsedUrl1 && parsedUrl2) {
      expect(parsedUrl1.url).toBe("http://example.com/path/");
      expect(parsedUrl2.url).toBe("http://example.com/path/");
    }
  });
});