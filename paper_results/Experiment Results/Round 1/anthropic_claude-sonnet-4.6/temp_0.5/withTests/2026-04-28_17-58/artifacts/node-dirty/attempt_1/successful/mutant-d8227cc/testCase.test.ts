import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty db loading', () => {
  it('should process corrupted row during data event, not at stream end, when chunk lastIndexOf newline equals 1', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}.dirty`);
    // Write exactly 'a\n' - when read as a chunk, lastIndexOf('\n') === 1
    // Original: processes the chunk (1 !== -1), emits "Could not load corrupted row: a"
    // Mutant: skips the chunk (1 === 1), emits "Corrupted row at the end of the db: a\n"
    fs.writeFileSync(tmpFile, 'a\n', 'utf-8');
    
    const db = new Dirty(tmpFile);
    
    let errorMessage = '';
    db.on('error', (err: Error) => {
      if (!errorMessage) errorMessage = err.message;
    });
    
    db.on('load', () => {
      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
      expect(errorMessage).toMatch(/Could not load corrupted row/);
      done();
    });
  });
});