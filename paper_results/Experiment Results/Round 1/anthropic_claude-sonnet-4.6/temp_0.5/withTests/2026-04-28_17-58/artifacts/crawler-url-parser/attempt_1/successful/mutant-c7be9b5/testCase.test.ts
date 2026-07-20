import { execSync } from 'child_process';
import * as path from 'path';

describe('module.parent guard behavior', () => {
  it('should output "for testing purpose" when run directly as main module', () => {
    const modulePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    let output: string;
    try {
      output = execSync(`node "${modulePath}"`, { encoding: 'utf8', timeout: 5000 });
    } catch (e: any) {
      output = e.stdout || '';
    }
    expect(output).toContain('for testing purpose');
  });
});