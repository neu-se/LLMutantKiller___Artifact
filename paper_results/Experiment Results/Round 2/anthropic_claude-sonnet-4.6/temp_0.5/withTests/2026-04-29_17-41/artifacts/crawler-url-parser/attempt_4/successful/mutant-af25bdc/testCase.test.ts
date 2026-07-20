import { execSync } from 'child_process';
import * as path from 'path';

describe('module direct execution output', () => {
  it('should print "for testing purpose" when run directly', () => {
    const modulePath = path.resolve(
      __dirname,
      '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'
    );
    
    const output = execSync(`node "${modulePath}"`).toString();
    
    expect(output).toBe('for testing purpose\n');
  });
});