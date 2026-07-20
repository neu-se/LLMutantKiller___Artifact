import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with base url', () => {
  it('should set baseurl correctly when resolving relative url', () => {
    const result = parse("./page", "http://www.example.com/dir/?ref=home");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/dir/page");
    expect(result!.baseurl).toBe("http://www.example.com/dir/?ref=home");
  });
});