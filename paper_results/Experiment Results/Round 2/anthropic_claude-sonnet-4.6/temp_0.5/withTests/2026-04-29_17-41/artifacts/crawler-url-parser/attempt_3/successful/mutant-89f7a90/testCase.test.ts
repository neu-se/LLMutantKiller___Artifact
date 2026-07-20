import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing fragment', () => {
  it('should set baseurl correctly when baseUrl has a fragment and current URL is relative', () => {
    // With original: baseUrlStr fragment stripped → baseurl = "http://www.stackoverflow.com/aaa/bbb/ccc"
    // With mutant: baseUrlStr gets "Stryker was here!" appended → baseurl will differ
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc#section");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb/ccc");
  });
});