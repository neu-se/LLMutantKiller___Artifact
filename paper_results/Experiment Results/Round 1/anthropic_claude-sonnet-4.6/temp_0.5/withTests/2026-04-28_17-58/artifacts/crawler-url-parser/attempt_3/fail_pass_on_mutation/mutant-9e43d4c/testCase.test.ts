import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with slashesDenoteHost mutation', () => {
  it('should correctly parse URL with query when resolved from relative path', () => {
    const res = parse("page?q1=v1&q2=v2", "http://www.example.com/base/path");
    expect(res).not.toBeNull();
    expect(res!.querycount).toBe(2);
    expect(res!.search).toBe("?q1=v1&q2=v2");
    expect(res!.url).toBe("http://www.example.com/base/page?q1=v1&q2=v2");
  });
});