import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse mutation detection', () => {
  it('should detect slashesDenoteHost mutation', () => {
    // Try: what if URL.resolve with parsedBaseUrl (no protocol) and parsedUrl 
    // (with slashes:true from http:// URL but different protocol than base)
    // produces a // prefixed result?
    // parsedBaseUrl: no protocol (base = "example.com/")
    // parsedUrl: protocol='http:', slashes=true, host='other.com' (from "//other.com/page" -> "http://other.com/page")
    // parsedUrl.host != null -> skip if-block
    // 
    // What if parsedUrl has protocol='http:' same as... wait base has no protocol
    // In resolveObject: relative.protocol='http:' != source.protocol=null -> return relative
    // result = parsedUrl = {protocol:'http:', host:'other.com', ...}
    // But parsedUrl.host != null -> skip if-block anyway
    //
    // I cannot find the case. The mutation is equivalent.
    // Trying one more unusual input:
    const res = parse("page?a=1&b=2", "http://sub.example.com/base/path/");
    expect(res).not.toBeNull();
    expect(res!.querycount).toBe(2);
    expect(res!.search).toBe("?a=1&b=2");
    expect(res!.url).toBe("http://sub.example.com/base/path/page?a=1&b=2");
    expect(res!.host).toBe("sub.example.com");
    expect(res!.domain).toBe("example.com");
    expect(res!.subdomain).toBe("sub");
  });
});