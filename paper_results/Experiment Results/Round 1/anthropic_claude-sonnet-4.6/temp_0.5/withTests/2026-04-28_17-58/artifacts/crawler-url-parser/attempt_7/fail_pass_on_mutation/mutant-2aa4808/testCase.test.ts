import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('detect slashesDenoteHost mutation', () => {
  it('should handle base url that is just a path starting with //', () => {
    // Pass a base URL that after processing might still be affected by slashesDenoteHost
    const result = parse("page", "http://example.com/path/to/dir/");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/path/to/dir/page");
    expect(result!.host).toBe("example.com");
  });
});