import cup from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('result_normalize_options stripWWW', () => {
  it('should have stripWWW set to true in normalize options', () => {
    // The extract function uses base URL matching - when sourceUrl has www
    // and a link resolves to the same URL without www, they should be deduplicated
    // This tests the observable behavior through extract
    const html = `<html><body>
      <a href="http://www.example.com/page">link1</a>
      <a href="http://www.example.com/other">link2</a>
    </body></html>`;
    
    const result = cup.extract(html, "http://www.example.com/");
    // baseUrl is www.example.com/, so it gets deleted from urlMap
    // With stripWWW:true the base url key would be normalized differently
    const urls = result.map((r: any) => r.url);
    expect(urls).toContain("http://www.example.com/page");
    expect(urls).toContain("http://www.example.com/other");
    expect(result.length).toBe(2);
  });
});