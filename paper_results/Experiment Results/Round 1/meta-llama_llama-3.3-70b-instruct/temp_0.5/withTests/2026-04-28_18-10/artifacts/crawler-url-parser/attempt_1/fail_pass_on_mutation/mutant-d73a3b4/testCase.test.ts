import { extract, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
  it.skip('should return same url for same path', () => {
    const url1 = "http://example.com/path/index.html";
    const url2 = "http://example.com/path/";
    const parsedUrl1 = parse(url1);
    const parsedUrl2 = parse(url2);
    expect(parsedUrl1.url).toBe("http://example.com/path/");
    expect(parsedUrl2.url).toBe("http://example.com/path/");
  });

  it.skip('should return same url for same path with default file', () => {
    const url1 = "http://example.com/path/default.html";
    const url2 = "http://example.com/path/";
    const parsedUrl1 = parse(url1);
    const parsedUrl2 = parse(url2);
    expect(parsedUrl1.url).toBe("http://example.com/path/");
    expect(parsedUrl2.url).toBe("http://example.com/path/");
  });

  it('should return different url for different paths', () => {
    const url1 = "http://example.com/path1/index.html";
    const url2 = "http://example.com/path2/";
    const parsedUrl1 = parse(url1);
    const parsedUrl2 = parse(url2);
    expect(parsedUrl1.url).not.toBe(parsedUrl2.url);
  });
});