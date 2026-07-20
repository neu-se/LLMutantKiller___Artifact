import * as fs from 'fs';
import * as path from 'path';

describe("result_normalize_options", () => {
  it("should have removeTrailingSlash set to true in the options configuration", () => {
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const source = fs.readFileSync(modulePath, 'utf8');
    const optionsMatch = source.match(/const result_normalize_options\s*=\s*\{([^}]+)\}/s);
    expect(optionsMatch).not.toBeNull();
    const optionsBlock = optionsMatch![1];
    const removeTrailingSlashMatch = optionsBlock.match(/removeTrailingSlash\s*:\s*(true|false)/);
    expect(removeTrailingSlashMatch).not.toBeNull();
    expect(removeTrailingSlashMatch![1]).toBe('true');
  });
});