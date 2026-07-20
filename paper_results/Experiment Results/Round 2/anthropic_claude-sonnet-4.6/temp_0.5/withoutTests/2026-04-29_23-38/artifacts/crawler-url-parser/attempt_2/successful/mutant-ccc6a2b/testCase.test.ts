import { execSync } from 'child_process';
import { resolve } from 'path';

describe('crawler-url-parser main module behavior', () => {
  it('should log "for testing purpose" when run as main module', () => {
    const modulePath = resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const output = execSync(`node ${modulePath}`).toString();
    expect(output).toContain('for testing purpose');
  });
});