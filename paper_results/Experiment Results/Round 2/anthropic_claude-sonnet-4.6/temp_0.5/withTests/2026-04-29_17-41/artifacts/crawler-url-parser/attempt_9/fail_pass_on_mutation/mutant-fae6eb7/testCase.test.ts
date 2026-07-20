import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse baseurl field with fragment in baseUrl', () => {
  it('should set baseurl field to the full parsed baseUrl after fragment stripping', () => {
    // When relative URL is resolved, baseurl field should reflect the base used
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc#section");
    expect(result).not.toBeNull();
    // The baseurl field is set from URL.format(parsedBaseUrl) after fragment stripping
    // With correct stripping, parsedBaseUrl has no hash
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb/ccc");
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
  });
});