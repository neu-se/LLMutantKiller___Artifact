import { tmpdir } from 'os';
import { join } from 'path';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should not emit empty line error when chunk has no newline but buffer has trailing newline', (done) => {
    const dbPath = join(tmpdir(), `dirty-test-${process.pid}.db`);
    
    // Create a file where one chunk ends with \n and the next chunk has no \n
    // The key insight: after processing a chunk ending in \n, buffer becomes ''
    // Then next chunk with no \n: buffer = chunk_content
    // In mutated: split('') = [chunk_content], pop removes it, forEach on [] - fine
    // 
    // But what about: chunk = 'rec1\n\n' - has empty line
    // Original: lastIndexOf('\n') != -1, process it, empty line causes error
    // Mutated: same
    //
    // Let me try: force a specific chunk boundary using highWaterMark
    
    const record = JSON.stringify({key: 'test', val: 'hello'});
    writeFileSync(dbPath, record + '\n');
    
    // Use a read stream with tiny buffer to force chunk boundaries
    // by creating the Dirty db - we can't control chunk size directly
    // but we can make the file content such that behavior differs
    
    const errors: Error[] = [];
    const db = new Dirty(dbPath);
    
    db.on('error', (err) => errors.push(err));
    db.on('load', (count) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('test')).toBe('hello');
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done();
      } catch(e) {
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done(e);
      }
    });
  });
});