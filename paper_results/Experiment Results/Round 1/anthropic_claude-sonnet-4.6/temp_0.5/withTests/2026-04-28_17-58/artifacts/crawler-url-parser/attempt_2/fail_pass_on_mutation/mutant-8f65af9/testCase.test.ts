import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function - link text when anchor has no text content", () => {
  it("should set text to empty string when anchor element has no text content", () => {
    // When an anchor has no text, cheerio's .text().trim() returns "" which is falsy
    // but the key is when text is null - we need to check the text property is "" not null
    // Using an img-only anchor where text() returns empty string after trim
    const html = `<html><body><a href="http://www.example.com/page"></a></body></html>`;
    const sourceUrl = "http://www.example.com/";
    
    const result = extract(html, sourceUrl);
    
    expect(result.length).toBeGreaterThan(0);
    const link = result.find((r: any) => r.url === "http://www.example.com/page");
    expect(link).toBeDefined();
    // In original: text == null ? "" : text => "" (empty string)
    // In mutated: false ? "" : text => text (which could be null/undefined)
    expect(link!.text).toBe("");
  });
});