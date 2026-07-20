import * as fs from 'fs';
import * as path from 'path';

describe('reduce', () => {
  it('should contain if(end) check not if(false) in source', () => {
    const filePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js');
    const source = fs.readFileSync(filePath, 'utf8');
    const matches = source.match(/if\(end\)/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBeGreaterThanOrEqual(2);
  });
});