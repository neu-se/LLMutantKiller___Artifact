import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract strips fragments from URLs', () => {
  it('should strip fragment identifiers from extracted URLs', () => {
    const html = '<html><body><a href="http://www.example.com/page#section">link</a></body></html>';
    const result = extract(html, "http://www.example.com/");
    expect(result.length).toBeGreaterThan(0);
    const url = result[0].url;
    expect(url).not.toContain('#');
    expect(url).toBe('http://www.example.com/page');
  });
});