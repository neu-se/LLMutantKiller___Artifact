describe("crawler-url-parser", () => {
  it("removeDirectoryIndex option should be true in result_normalize_options", () => {
    // Force re-evaluation by clearing cache
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    delete require.cache[modulePath];
    const mod = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    
    // Check parse behavior with index.html - if removeDirectoryIndex is true,
    // the URL map key in extract would normalize index.html away
    const { extract } = mod;
    const html = '<a href="http://www.example.com/index.html">link1</a><a href="http://www.example.com/">link2</a>';
    const results = extract(html, "http://www.other.com/");
    
    // With removeDirectoryIndex: true both URLs normalize to same, giving 1 result
    // With removeDirectoryIndex: false they're different, giving 2 results  
    expect(results.length).toBe(1);
  });
});