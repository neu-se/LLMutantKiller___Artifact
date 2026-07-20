import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
  it('should return same url for same path with index.html and default.html', () => {
    const url1 = "http://example.com/path/index.html";
    const url2 = "http://example.com/path/default.html";
    const parsedUrl1 = parse(url1);
    const parsedUrl2 = parse(url2);
    if (parsedUrl1 && parsedUrl2) {
      expect(parsedUrl1.url).toBe("http://example.com/path/index.html");
      expect(parsedUrl2.url).toBe("http://example.com/path/default.html");
    }
  });
});