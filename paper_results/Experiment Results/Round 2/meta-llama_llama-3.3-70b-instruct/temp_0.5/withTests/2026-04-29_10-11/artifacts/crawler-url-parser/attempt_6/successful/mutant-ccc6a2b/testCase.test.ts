import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should have a debugger statement when run directly', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('debugger');
  });
});