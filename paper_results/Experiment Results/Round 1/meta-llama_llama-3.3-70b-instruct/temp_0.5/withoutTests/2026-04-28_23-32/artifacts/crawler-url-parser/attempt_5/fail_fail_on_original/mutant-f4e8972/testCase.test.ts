import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse HTML data', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a></body></html>';
    const result1 = extract(html, 'https://www.example.com');
    expect(result1).not.toHaveLength(0);
    if (result1.length > 0) {
      expect(result1[0].url).toBe('https://www.example.com');
      expect(result1[0].text).toBe('Example');
    }
    const result2 = extract(html, 'https://www.example.com');
    expect(result2).not.toHaveLength(0);
    if (result2.length > 0) {
      expect(result2[0].url).toBe('https://www.example.com');
      expect(result2[0].text).toBe('Example');
    }
    expect(result1).toEqual(result2);
  });
});