import * as fs from 'fs';
import * as path from 'path';

describe('crawler-url-parser result_normalize_options stripWWW', () => {
  it('should have stripWWW set to true in the module source', () => {
    // Find the actual module file and read its content to verify the option value
    // This is the only reliable way since result_normalize_options is not exported
    // and not applied to any observable function behavior
    
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    const source = fs.readFileSync(modulePath, 'utf8');
    
    // Parse out the stripWWW value from the source
    const match = source.match(/stripWWW\s*:\s*(true|false)/);
    expect(match).not.toBeNull();
    expect(match![1]).toBe('true');
  });
});