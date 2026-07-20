import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract deduplicates URLs that differ only by fragment', () => {
  it('should treat URLs with and without fragments as the same URL', () => {
    const html = `<html><body>
      <a href="http://www.other.com/page#fragment-identifier">anchor link</a>
    </body></html>`;
    
    const sourceUrl = "http://www.example.com/";
    const result = extract(html, sourceUrl);
    
    // The extracted URL should not contain a fragment
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://www.other.com/page");
  });
});