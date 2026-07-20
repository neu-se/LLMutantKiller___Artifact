import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should merge text from duplicate URLs instead of overwriting', () => {
    // Create HTML with two anchor tags pointing to the same URL but with different text
    const html = `
      <html>
        <body>
          <a href="http://example.com/page">First Text</a>
          <a href="http://example.com/page">Second Text</a>
        </body>
      </html>
    `;
    
    const sourceUrl = 'http://example.com/';
    const result = extract(html, sourceUrl);
    
    // Find the entry for the duplicate URL
    const pageEntry = result.find((item: any) => item.url && item.url.includes('example.com/page'));
    
    // In the original code, when a URL already exists in the map,
    // the text should be merged (concatenated) from both anchor tags.
    // With the mutation (if (false)), the duplicate URL handling is skipped,
    // meaning the second anchor tag's URL won't be added at all (since urlMap.has check is bypassed
    // and the else branch adds it - but wait, with if(false) the entire block is skipped).
    // Actually with if(false), neither branch executes, so the second occurrence is completely ignored.
    // The first occurrence should still be added via the else branch on first encounter.
    
    // The first link should be present
    expect(pageEntry).toBeDefined();
    
    // With original code: text should contain both "First Text" and "Second Text" merged
    // With mutated code: only "First Text" would be present (second occurrence skipped entirely)
    expect(pageEntry?.text).toContain('First Text');
    expect(pageEntry?.text).toContain('Second Text');
  });
});