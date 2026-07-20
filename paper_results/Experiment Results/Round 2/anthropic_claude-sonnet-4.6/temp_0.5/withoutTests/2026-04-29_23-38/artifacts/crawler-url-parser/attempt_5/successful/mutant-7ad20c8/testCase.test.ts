import { execFileSync } from 'child_process';
import * as path from 'path';

describe('crawler-url-parser', () => {
  it('should not log to console when required as a module dependency', () => {
    const modulePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    // Write a wrapper that requires the module - this sets module.parent on the required module
    const wrapperScript = `
      // This script requires the module, so the module's module.parent will be set to this script's module
      const m = require(${JSON.stringify(modulePath)});
      process.stdout.write(JSON.stringify({ loaded: true }));
    `;
    
    const output = execFileSync(process.execPath, ['-e', wrapperScript], { encoding: 'utf8' });
    
    // Original: module.parent is set (this wrapper), so !module.parent = false, block doesn't run, no console.log
    // Mutated: if(true) always runs, console.log prints "for testing purpose"
    expect(output).not.toContain('for testing purpose');
  });
});