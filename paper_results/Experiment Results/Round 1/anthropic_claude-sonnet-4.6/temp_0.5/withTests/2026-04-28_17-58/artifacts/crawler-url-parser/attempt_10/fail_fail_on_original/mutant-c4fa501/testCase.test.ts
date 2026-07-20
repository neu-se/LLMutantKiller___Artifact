const cup = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('extract deduplication of index and directory', () => {
  it('should count URLs correctly with index.htm as source and directory link present', () => {
    const html = `<html><body>
      <a href="http://www.example.com/">home dir</a>
      <a href="http://www.example.com/about">about</a>
    </body></html>`;
    // source is index.htm - parse gives url as index.htm
    // link to / - parse gives url as /
    // these are different strings so both appear unless normalized
    const result = cup.extract(html, 'http://www.example.com/index.htm');
    // base url = http://www.example.com/index.htm (or / if normalized)
    // With removeDirectoryIndex:true: base normalizes to http://www.example.com/
    //   so http://www.example.com/ link gets deleted as base url -> 1 result
    // With removeDirectoryIndex:false: base stays as index.htm
    //   so http://www.example.com/ link NOT deleted -> 2 results
    expect(result.length).toBe(1);
  });
});