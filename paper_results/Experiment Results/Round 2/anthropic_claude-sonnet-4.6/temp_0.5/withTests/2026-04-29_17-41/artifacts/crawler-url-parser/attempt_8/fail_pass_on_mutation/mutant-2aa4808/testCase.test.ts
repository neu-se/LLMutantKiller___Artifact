import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with base url checking baseurl property', () => {
  it('should set baseurl to the normalized base url', () => {
    const result = parse("page.html", "http://www.example.com/dir/index.html");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("http://www.example.com/dir/index.html");
    expect(result!.url).toBe("http://www.example.com/dir/page.html");
  });
});