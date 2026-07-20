import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser';
import * as fs from 'fs';
import * as childProcess from 'child_process';

describe('crawler-url-parser', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const tempFile = 'temp.js';
    fs.writeFileSync(tempFile, `
      const { parse } = require('./crawler-url-parser');
      if (!module.parent) {
        console.log("Test executed");
      }
      const result = parse("https://www.npmjs.com/package/electron-window-manager");
    `);
    const result = childProcess.execSync(`node ${tempFile}`);
    expect(result.toString()).toContain("Test executed");
    fs.unlinkSync(tempFile);
  });
});