import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('slashesDenoteHost mutation', () => {
  it('detects mutation through query object in resolved url', () => {
    const result = parse("page", "http://example.com/dir/");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/dir/page");
    expect(result!.query).toBeUndefined();
  });
});