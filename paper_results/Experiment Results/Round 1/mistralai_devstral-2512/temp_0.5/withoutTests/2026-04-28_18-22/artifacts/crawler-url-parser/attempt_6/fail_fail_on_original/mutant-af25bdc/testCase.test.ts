import { execSync } from 'child_process';
import path from 'path';

describe('crawler-url-parser main module execution', () => {
  it('should log non-empty message when run as main module', () => {
    const modulePath = path.resolve(__dirname, '../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const output = execSync(`node ${modulePath}`, { encoding: 'utf8' }).trim();

    // This test checks that the output is exactly "for testing purpose"
    // The mutant changes this to an empty string, which will fail this test
    expect(output).toBe('for testing purpose');
    expect(output).not.toBe('');
    expect(output.length).toBe(18); // Exact length of "for testing purpose"
  });
});