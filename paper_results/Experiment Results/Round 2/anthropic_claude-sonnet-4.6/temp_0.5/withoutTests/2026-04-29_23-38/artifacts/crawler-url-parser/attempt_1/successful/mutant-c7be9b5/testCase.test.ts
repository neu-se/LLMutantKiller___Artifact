import { execSync } from 'child_process';
import * as path from 'path';

describe('crawler-url-parser direct execution', () => {
  it('should output "for testing purpose" when run directly (module.parent is null)', () => {
    // When run directly, the original code has !module.parent = true, so console.log runs
    // When mutated to if(false), console.log never runs
    const filePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    let output = '';
    try {
      output = execSync(`node "${filePath}"`, { encoding: 'utf8', timeout: 5000 });
    } catch (e: any) {
      output = e.stdout || '';
    }
    
    // Original: !module.parent is true when run directly, so "for testing purpose" is logged
    // Mutated: if(false) means it never logs
    expect(output).toContain('for testing purpose');
  });
});