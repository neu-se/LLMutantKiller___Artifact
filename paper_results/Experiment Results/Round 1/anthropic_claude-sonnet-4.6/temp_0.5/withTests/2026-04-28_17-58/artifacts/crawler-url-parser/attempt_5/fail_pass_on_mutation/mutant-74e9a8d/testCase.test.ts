import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.html normalization', () => {
  it('should return internal not uplevel when link ends with default.html and page path contains link prefix without trailing slash', () => {
    // link: /aaa/default.html -> original normalizes to /aaa/ (parts: ['aaa'])
    // page: /aaa_b/x -> stays /aaa_b/x (parts: ['aaa_b','x'])
    // diff = -1
    // original: /aaa_b/x.includes('/aaa/') = false -> internal
    // mutated:  linkurl_path='/aaa', /aaa_b/x.includes('/aaa') = true -> uplevel
    const result = gettype(
      'http://example.com/aaa/default.html',
      'http://example.com/aaa_b/x'
    );
    expect(result).toBe('internal');
  });
});