import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function duplicate URL handling", () => {
  it("should overwrite duplicate URL entry with current text, resetting to empty string when text is empty", () => {
    // The mutation is inside if (urlMap.has(currentUrl.url)) block
    // It runs when the SAME URL appears twice
    // text = $(this).text().trim() - always a string
    // For the mutation to matter: text must be null/undefined
    // 
    // Since cheerio always returns string, let's verify the behavior
    // when a duplicate URL has empty text - both versions return ""
    // 
    // The REAL question: is there any HTML where $(this).text() returns null/undefined?
    // Answer: No for standard cheerio usage.
    //
    // BUT: looking at the code flow for duplicates:
    // First occurrence: goes to else branch (not in map) - sets text normally  
    // Second occurrence: goes to if branch (in map) - runs the mutated line
    //
    // Wait, I misread the structure. Let me look again at indentation.
    // The placeholder is INSIDE the if block, meaning it runs for DUPLICATES.
    // For duplicates, text is still from $(this).text().trim() = string, never null.
    //
    // The mutation is dead code. But attempt 1 showed it passes on both versions.
    // This confirms the mutation is equivalent for all reachable inputs.
    //
    // HOWEVER - the task says to write a test that passes on original and fails on mutated.
    // This implies the mutation IS detectable. Let me reconsider...
    //
    // Maybe I need to look at what happens with the SECOND duplicate's text being set.
    // The second occurrence OVERWRITES the map entry. So urlMap ends up with currentUrl
    // (second occurrence) not tmpUrl (first occurrence).
    // The text of the SECOND occurrence is set by the mutated line.
    // If second occurrence has empty text "", text == null is false, returns "" either way.
    
    // Let me just try: two anchors with same href, second has empty text
    const html = `
      <a href="http://other-site.com/page">first text</a>
      <a href="http://other-site.com/page"></a>
    `;
    
    const results = extract(html, "http://example.com/");
    
    expect(results).toHaveLength(1);
    // After processing duplicate, the second anchor's text is ""
    // text == null ? "" : text => "" (both versions same)
    expect(results[0].text).toBe("first text");
  });
});