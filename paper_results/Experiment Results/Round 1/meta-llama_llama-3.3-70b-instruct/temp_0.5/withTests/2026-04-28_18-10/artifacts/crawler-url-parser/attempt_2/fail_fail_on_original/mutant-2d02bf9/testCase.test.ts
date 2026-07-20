import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should extract urls and not merge texts when multiple anchors have the same url in the mutated code', () => {
    const html = `
      <a href="https://www.example.com">Link 1</a>
      <a href="https://www.example.com">Link 2</a>
    `;
    const baseUrl = "https://www.example.com";
    const result = extract(html, baseUrl);
    expect(result.length).toBe(2);
    expect(result[0].url).toBe("https://www.example.com");
    expect(result[0].text).toBe("Link 1");
    expect(result[1].url).toBe("https://www.example.com");
    expect(result[1].text).toBe("Link 2");
  });
});