import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract', () => {
  it('should resolve relative links when source is http URL', () => {
    const html = '<a href="about.html">About</a>';
    const result = extract(html, 'http://www.example.com/');
    // With original: baseUrl is correctly parsed, relative link resolves
    // With mutated: baseUrl is null (parse returns null), relative link doesn't resolve
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].url).toContain('example.com');
  });
});