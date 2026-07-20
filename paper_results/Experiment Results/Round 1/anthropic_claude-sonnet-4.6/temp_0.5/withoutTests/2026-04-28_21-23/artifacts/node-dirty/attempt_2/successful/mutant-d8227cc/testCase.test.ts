import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database loading', () => {
  it('should process a chunk with a newline at index 1 as a row (not skip it)', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a file whose entire content is exactly 2 bytes: '}\n'
    // The single chunk will have lastIndexOf('\n') === 1.
    //
    // Original code: condition is (1 === -1) → false → proceeds to process the chunk
    //   → tries JSON.parse('}') → emits error 'Could not load corrupted row: }'
    //   → on 'end': buffer is empty → emits load(0)
    //
    // Mutated code: condition is (1 === 1) → true → returns early (skips chunk)
    //   → on 'end': buffer = '}\n' (non-empty) → emits error 'Corrupted row at the end of the db: }\n'
    //   → emits load(0)
    //
    // Observable difference: which error message is emitted first.
    fs.writeFileSync(dbPath, '}\n');

    const errorMessages: string[] = [];

    const db = new Dirty(dbPath);

    db.on('error', (err: Error) => {
      errorMessages.push(err.message);
    });

    db.on('load', () => {
      try {
        // Original emits the "corrupted row" error (row-level parse failure).
        // Mutated emits the "end of db" error (buffer non-empty at end).
        // Only the original produces a message containing 'Could not load corrupted row'.
        expect(errorMessages.some(m => m.includes('Could not load corrupted row'))).toBe(true);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      } catch (e) {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
        done(e as Error);
      }
    });
  });
});