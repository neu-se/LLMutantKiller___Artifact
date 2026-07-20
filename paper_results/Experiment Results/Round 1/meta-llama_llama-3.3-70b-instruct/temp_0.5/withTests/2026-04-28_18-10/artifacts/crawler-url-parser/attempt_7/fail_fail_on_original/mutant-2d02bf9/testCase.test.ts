import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should extract urls and merge texts when multiple anchors have the same url', () => {
    const html = `
      <a href="https://www.example1.com">Link 1</a>
      <a href="https://www.example1.com">Link 2</a>
    `;
    const baseUrl = "https://www.example1.com";
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].text).toContain("Link 1");
    expect(result[0].text).toContain("Link 2");
  });
});