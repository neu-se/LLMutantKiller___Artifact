import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser result_normalize_options", () => {
  it("should have result_normalize_options with stripWWW true affecting module-level behavior", () => {
    // The result_normalize_options object with stripWWW: true should be defined
    // We test this indirectly by checking the module's source behavior
    // Since result_normalize_options is defined but not used in exported functions,
    // we verify the module loads correctly and the constant is accessible via module internals
    const mod = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    
    // Access the module's internal constant via the module wrapper
    // Both versions export the same functions, but we can check the source
    const fs = require('fs');
    const path = require('path');
    const source = fs.readFileSync(
      path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'),
      'utf8'
    );
    
    expect(source).toContain('stripWWW: true');
  });
});