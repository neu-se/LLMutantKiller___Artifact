import { execSync } from 'child_process';
import path from 'path';

describe('crawler-url-parser main module execution', () => {
  it('should log "for testing purpose" when run as main module', () => {
    const modulePath = path.resolve(__dirname, 'crawler-url-parser.js');
    const output = execSync(`node ${modulePath}`, { encoding: 'utf8' }).trim();

    // Original code logs "for testing purpose", mutant logs ""
    expect(output).toBe('for testing purpose');
    expect(output).not.toBe('');
  });
});