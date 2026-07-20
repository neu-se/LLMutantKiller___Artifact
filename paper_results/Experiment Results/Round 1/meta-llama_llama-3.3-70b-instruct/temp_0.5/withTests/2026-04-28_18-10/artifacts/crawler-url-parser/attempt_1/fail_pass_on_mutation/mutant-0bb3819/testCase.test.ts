import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" for same level URLs', () => {
    const linkUrl = "http://sub.domain.com/aaa/bbb/ccc";
    const pageUrl = "http://sub.domain.com/aaa/bbb/ddd";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });

  it('should return "sublevel" for sublevel URLs', () => {
    const linkUrl = "http://sub.domain.com/aaa/bbb/ccc/ddd";
    const pageUrl = "http://sub.domain.com/aaa/bbb/ccc";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });

  it('should return "uplevel" for uplevel URLs', () => {
    const linkUrl = "http://sub.domain.com/aaa/bbb";
    const pageUrl = "http://sub.domain.com/aaa/bbb/ccc";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });

  it.skip('should return "internal" for internal URLs', () => {
    const linkUrl = "http://sub.domain.com/aaa/bbb/ccc/ddd";
    const pageUrl = "http://sub.domain.com/aaa/bbb/ccc/eee";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("internal");
  });

  it('should return "subdomain" for subdomain URLs', () => {
    const linkUrl = "http://sub1.domain.com/aaa/bbb/ccc";
    const pageUrl = "http://sub2.domain.com/aaa/bbb/ccc";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("subdomain");
  });

  it('should return "updomain" for updomain URLs', () => {
    const linkUrl = "http://domain.com/aaa/bbb/ccc";
    const pageUrl = "http://sub.domain.com/aaa/bbb/ccc";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("updomain");
  });

  it('should return "external" for external URLs', () => {
    const linkUrl = "http://domain1.com/aaa/bbb/ccc";
    const pageUrl = "http://domain2.com/aaa/bbb/ccc";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("external");
  });
});