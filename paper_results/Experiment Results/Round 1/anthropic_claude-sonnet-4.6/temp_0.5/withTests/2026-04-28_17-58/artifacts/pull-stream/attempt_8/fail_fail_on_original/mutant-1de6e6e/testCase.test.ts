import * as fs from 'fs';
import * as path from 'path';

describe('reduce', () => {
  it('should not have more than one if(false) in implementation', () => {
    const filePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js');
    const source = fs.readFileSync(filePath, 'utf8');
    // Original has one if(false) (the outer dead code guard)
    // Mutated has two if(false) occurrences
    const matches = source.match(/if\s*\(false\)/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(1);
  });
});