import * as cup from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('result_normalize_options stripFragment behavior', () => {
  it('should have stripFragment set to true in normalize options', () => {
    // Access the module's source to verify the stripFragment option
    const fs = require('fs');
    const path = require('path');
    const src = fs.readFileSync(
      path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'),
      'utf8'
    );
    expect(src).toContain('stripFragment: true');
  });
});