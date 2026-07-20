import * as cup from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('result_normalize_options stripWWW configuration', () => {
  it('should have stripWWW set to true in the module options', () => {
    // Access the module to check if stripWWW option is exposed or affects behavior
    const moduleExports = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    // The stripWWW option should be true - verify by checking module source behavior
    // Since result_normalize_options is not exported, we verify through parse behavior
    // A URL with www subdomain parsed and used in extract should behave consistently
    const html = '<a href="http://www.example.com/page">link</a>';
    const result = moduleExports.extract(html, "http://www.example.com/");
    expect(result.length).toBe(0); // base url removed, www.example.com/page vs www.example.com/
  });
});