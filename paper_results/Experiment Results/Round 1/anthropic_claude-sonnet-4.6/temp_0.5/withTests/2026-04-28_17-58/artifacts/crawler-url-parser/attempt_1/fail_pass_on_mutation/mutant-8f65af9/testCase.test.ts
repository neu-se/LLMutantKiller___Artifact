import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function - link text property", () => {
  it("should set the text property of extracted links to the anchor text, not an empty string", () => {
    const html = `<html><body><a href="http://www.example.com/page">Hello World</a></body></html>`;
    const sourceUrl = "http://www.example.com/";
    
    const result = extract(html, sourceUrl);
    
    expect(result.length).toBeGreaterThan(0);
    const link = result.find((r: any) => r.url === "http://www.example.com/page");
    expect(link).toBeDefined();
    expect(link!.text).toBe("Hello World");
  });
});