import { execSync } from 'child_process';
import * as path from 'path';

describe('crawler-url-parser direct execution', () => {
  it('should output "for testing purpose" when run directly as main module', () => {
    const filePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    let stdout: string;
    try {
      stdout = execSync(`node "${filePath}"`, { encoding: 'utf8', timeout: 5000 });
    } catch (e: any) {
      stdout = e.stdout || '';
    }
    expect(stdout).toContain('for testing purpose');
  });
});