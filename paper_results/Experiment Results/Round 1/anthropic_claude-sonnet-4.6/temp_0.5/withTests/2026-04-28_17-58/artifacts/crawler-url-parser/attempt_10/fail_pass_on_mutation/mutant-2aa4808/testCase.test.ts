import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('slashesDenoteHost mutation detection', () => {
  it('detects mutation via specific url format', () => {
    const result = parse("./page", "http://example.com/dir/file.html?a=1");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/dir/page");
    expect(result!.baseurl).toBe("http://example.com/dir/file.html?a=1");
    expect(result!.search).toBeNull();
  });
});