import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty file loading', () => {
  it('should emit "Could not load corrupted row" error (not end-of-db error) when chunk lastIndexOf newline is 1', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}.dirty`);

    // File content "}\n": chunk.lastIndexOf('\n') === 1
    // Original: condition === -1 is false, proceeds to parse "}" as a row,
    //   fails JSON parse, emits: error "Could not load corrupted row: }"
    //   then 'end' fires with empty buffer, emits 'load'
    // Mutant: condition === 1 is true, returns early without parsing,
    //   then 'end' fires with buffer "}\n" (non-empty), emits error "Corrupted row at the end of the db: }\n"
    //   then emits 'load'
    fs.writeFileSync(file, '}\n', 'utf-8');

    const errors: string[] = [];
    const db = new Dirty(file);

    // Must attach error listener before anything else to prevent unhandled error crash
    db.on('error', (err: Error) => {
      errors.push(err.message);
    });

    db.on('load', (_size: number) => {
      try {
        fs.unlinkSync(file);
      } catch { /* ignore */ }

      try {
        expect(errors.length).toBe(1);
        expect(errors[0]).toMatch(/Could not load corrupted row/);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});