import { extract } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should append text to existing url in urlMap', () => {
    const html = '<a href="https://www.example.com">Link 1</a><a href="https://www.example.com">Link 2</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(html, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('https://www.example.com');
    expect(result[0].text).toContain('Link 1');
    expect(result[0].text).toContain('Link 2');
    expect(result[0].text).toEqual(expect.stringContaining('Link 1 Link 2'));
  });
});