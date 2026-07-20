import { execSync } from 'child_process';
import * as path from 'path';

describe('module direct execution behavior', () => {
  it('should output "for testing purpose" only when run directly, not when required', () => {
    const modulePath = path.resolve(__dirname, '../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    // Run the module directly - original (!module.parent) should print, mutated (module.parent) should not
    const output = execSync(`node ${modulePath}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    
    expect(output).toContain('for testing purpose');
  });
});