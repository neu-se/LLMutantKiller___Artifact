import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should skip anchor tags with undefined href', () => {
  it('should not throw and should return only valid URLs when an anchor tag has no href attribute', () => {
    const html = `<html><body>
      <a>no href anchor</a>
      <a href="http://www.example.com/page1">valid link</a>
    </body></html>`;

    // In the original code, the anchor with no href is skipped (typeof href == "undefined" returns true)
    // In the mutated code, typeof href == "" is false, so it proceeds to call href.length which throws
    // because href is undefined
    expect(() => {
      const result = extract(html, "http://www.example.com/");
      // Should only contain the valid link, not crash
      expect(result.length).toBe(1);
      expect(result[0].url).toBe("http://www.example.com/page1");
    }).not.toThrow();
  });
});