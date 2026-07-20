import { tmpdir } from 'os';
import { join } from 'path';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should correctly load a record whose JSON contains no newline when chunk has newline', (done) => {
    const dbPath = join(tmpdir(), `dirty-test-${process.pid}.db`);
    
    // If buffer += chunk is AFTER the if-check:
    // Original: only adds chunk to buffer if chunk has newline
    // Mutated: always adds chunk to buffer (never returns early)
    // 
    // For a small file (single chunk with newline): both work the same
    // For a large file where last chunk has no newline: 
    //   Original: last chunk ignored, end event sees buffer without last partial
    //   Mutated: last chunk added, end event sees buffer with last partial
    //
    // But for complete records with trailing newline, last chunk ends with \n
    // so both work the same
    //
    // The difference would show if we have a file where the LAST chunk has no newline
    // AND contains complete records... but complete records end with \n
    
    // Actually if buffer += chunk is after the if-check, and a chunk has no newline,
    // the chunk is completely lost in the original. For a file that fits in one chunk
    // with a trailing newline, the chunk HAS a newline, so both work.
    
    // For a file without trailing newline:
    // The last chunk has no newline (just the partial last record)
    // Original: ignores this chunk entirely
    // Mutated: adds it to buffer, end event sees it as corrupted row
    
    const dbPath2 = dbPath;
    writeFileSync(dbPath2, JSON.stringify({key: 'test', val: 'value'}) + '\nno-newline-at-end');
    
    let corruptedError = false;
    const db = new Dirty(dbPath2);
    
    db.on('error', (err) => {
      if (err.message.includes('Corrupted row at the end')) corruptedError = true;
    });
    
    db.on('load', (count) => {
      try {
        // In original (buffer += chunk after if): last chunk ignored, no corrupted error
        // In mutated (never return early): last chunk added, corrupted error emitted
        // Wait, this is backwards from what we want...
        // We want original to pass and mutated to fail
        // If original ignores the no-newline chunk, it loads 1 record, no error
        // If mutated adds it, it emits corrupted error but still loads 1 record
        // 
        // Hmm, but the test should PASS on original and FAIL on mutated
        // If we assert no error: original passes (no error), mutated fails (has error)
        
        expect(corruptedError).toBe(false);
        expect(count).toBe(1);
        if (existsSync(dbPath2)) unlinkSync(dbPath2);
        done();
      } catch(e) {
        if (existsSync(dbPath2)) unlinkSync(dbPath2);
        done(e);
      }
    });
  });
});