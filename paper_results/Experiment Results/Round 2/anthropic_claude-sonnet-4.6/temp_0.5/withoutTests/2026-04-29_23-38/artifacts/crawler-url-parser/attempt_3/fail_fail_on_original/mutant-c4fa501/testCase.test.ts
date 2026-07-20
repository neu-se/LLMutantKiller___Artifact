import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should deduplicate index.html URLs with root URL when removeDirectoryIndex is true", () => {
    const html = '<a href="http://example.com/">Home</a><a href="http://example.com/index.html">Also Home</a>';
    const result = extract(html, "http://example.com/about/");
    const urls = result.map(r => r.url);
    // With removeDirectoryIndex: true, both should normalize to same URL
    expect(urls.filter(u => u === "http://example.com/").length).toBe(1);
    expect(urls.some(u => u.includes("index.html"))).toBe(false);
  });
});