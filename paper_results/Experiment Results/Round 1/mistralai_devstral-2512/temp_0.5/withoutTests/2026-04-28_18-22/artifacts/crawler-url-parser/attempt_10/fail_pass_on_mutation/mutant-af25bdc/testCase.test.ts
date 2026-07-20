import { execSync } from 'child_process';
import path from 'path';

describe('crawler-url-parser main module execution', () => {
  it('should log the exact original message when run as main module', () => {
    const modulePath = path.resolve(__dirname, '../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const output = execSync(`node ${modulePath}`, { encoding: 'utf8' });

    // This test checks for the exact original message including newline
    // The mutant changes this to an empty string, which will fail this test
    expect(output).toBe('for testing purpose\n');
    expect(output.trim()).toBe('for testing purpose');
  });
});