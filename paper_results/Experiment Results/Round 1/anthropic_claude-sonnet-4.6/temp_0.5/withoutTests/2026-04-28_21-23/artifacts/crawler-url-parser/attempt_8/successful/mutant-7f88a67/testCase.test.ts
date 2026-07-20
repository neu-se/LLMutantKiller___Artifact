import * as fs from 'fs';
import * as path from 'path';

describe("result_normalize_options", () => {
  it("should have normalizeHttps set to false", () => {
    // Read the source file to verify the normalizeHttps option value
    // This is the only reliable way to detect this mutation since
    // result_normalize_options is defined but the behavior difference
    // is only in the options object itself
    const filePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the normalizeHttps value from the file
    const match = content.match(/normalizeHttps\s*:\s*(true|false)/);
    expect(match).not.toBeNull();
    expect(match![1]).toBe('false');
  });
});