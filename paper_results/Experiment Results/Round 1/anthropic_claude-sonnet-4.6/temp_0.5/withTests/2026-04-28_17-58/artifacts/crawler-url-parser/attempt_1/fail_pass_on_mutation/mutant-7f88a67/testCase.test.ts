import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse https URL protocol preservation', () => {
  it('should preserve https protocol when normalizeHttps is false', () => {
    const result = parse("https://www.question.stackoverflow.com/aaa/bbb/ddd?q1=query1&q2=query2/");
    expect(result).not.toBeNull();
    expect(result.protocol).toBe("https:");
    expect(result.url).toContain("https://");
  });
});