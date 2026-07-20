import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.html normalization affecting sublevel detection', () => {
  it('should return internal (not sublevel) when link path contains page path string only due to missing trailing slash', () => {
    // pageurl has /default.html which normalizes to:
    //   original: /aaa/ (with trailing slash)
    //   mutated:  /aaa  (without trailing slash)
    // linkurl path is /aaabbb/page - contains "/aaa" but NOT "/aaa/"
    // original: "/aaabbb/page".includes("/aaa/") => false => "internal"
    // mutated:  "/aaabbb/page".includes("/aaa")  => true  => "sublevel"
    const result = gettype(
      'http://www.example.com/aaabbb/page',
      'http://www.example.com/aaa/default.html'
    );
    expect(result).toBe('internal');
  });
});