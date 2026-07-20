import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with slashesDenoteHost behavior', () => {
  it('should correctly parse host when currentUrlStr has protocol-relative form at second parse', () => {
    // Use a relative URL with a base that, after resolution and formatting,
    // produces a URL where slashesDenoteHost matters.
    // URL.resolve of a base with a relative path starting with // 
    // After the first URL.parse with slashesDenoteHost=true, //host/path gets host set
    // But if host is null (relative path like "../ddd"), we go into the if block
    // and currentUrlStr becomes the formatted absolute URL (http://...)
    // For the case where parsedUrl.host IS set (absolute URL), currentUrlStr stays as-is
    // and was already converted from // to http:// at the top
    // 
    // The only remaining case: what if URL.format produces a // URL?
    // Let's try a URL that goes through the if block where currentUrlStr gets set
    // to URL.format(absoluteUrl) - could absoluteUrl have no protocol?
    const res = parse("../ddd?q1=v1&q2=v2", "http://www.stackoverflow.com/aaa/bbb/ccc/");
    expect(res).not.toBeNull();
    expect(res!.querycount).toBe(2);
    expect(res!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd?q1=v1&q2=v2");
  });
});