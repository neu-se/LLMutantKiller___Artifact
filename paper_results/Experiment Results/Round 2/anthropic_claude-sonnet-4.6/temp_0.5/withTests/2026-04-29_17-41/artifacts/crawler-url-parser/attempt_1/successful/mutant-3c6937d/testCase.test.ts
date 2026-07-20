import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract with 3-character href', () => {
  it('should include links with href of exactly 3 characters', () => {
    const html = '<html><body><a href="/ab">link text</a></body></html>';
    const sourceUrl = 'http://www.example.com/page';
    const result = extract(html, sourceUrl);
    // "/ab" has length 3, which should pass the original check (< 3 is false)
    // but fail the mutated check (<= 3 is true, so it gets skipped)
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://www.example.com/ab');
  });
});