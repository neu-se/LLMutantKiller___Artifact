import { execSync } from 'child_process';
import path from 'path';

describe('crawler-url-parser main module execution', () => {
  it('should log non-empty message when run as main module', () => {
    const modulePath = path.resolve(__dirname, '../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const output = execSync(`node ${modulePath}`, { encoding: 'utf8' }).trim();

    // This test checks that the output contains the specific original message
    // The mutant changes this to an empty string, which will fail this test
    expect(output.includes('for testing purpose')).toBe(true);
    expect(output.length).toBeGreaterThan(0);
  });
});