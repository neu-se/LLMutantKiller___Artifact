import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.html in link url', () => {
  it('should return internal when link ends with default.html at same directory depth as page sublevel', () => {
    // link: /aaa/default.html -> original normalizes to /aaa/ (parts: ['aaa'])
    // page: /aaa/bbb          -> stays /aaa/bbb (parts: ['aaa','bbb'])
    // diff = -1; original: /aaa/bbb.includes('/aaa/') = false -> internal
    // mutated: linkurl_path='/aaa', /aaa/bbb.includes('/aaa') = true -> uplevel
    const result = gettype(
      'http://example.com/aaa/default.html',
      'http://example.com/aaa/bbb'
    );
    expect(result).toBe('internal');
  });
});