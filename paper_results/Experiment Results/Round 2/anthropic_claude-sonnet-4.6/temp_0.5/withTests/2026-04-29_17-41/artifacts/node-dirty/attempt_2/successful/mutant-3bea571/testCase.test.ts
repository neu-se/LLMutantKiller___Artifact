import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty empty line handling', () => {
  it('should emit error event (not empty string event) when an empty line is encountered in the db file', async () => {
    const tmpDir = os.tmpdir();
    const dbFile = path.join(tmpDir, `test-empty-line-${process.pid}.dirty`);

    // Write a db file with an empty line in the middle
    fs.writeFileSync(dbFile, '{"key":"foo","val":"bar"}\n\n{"key":"baz","val":"qux"}\n', 'utf-8');

    try {
      const result = await new Promise<{ errorEvent: boolean; emptyEvent: boolean }>((resolve) => {
        const db = new Dirty(dbFile);

        let errorEvent = false;
        let emptyEvent = false;

        db.on('error', () => {
          errorEvent = true;
        });

        db.on('', () => {
          emptyEvent = true;
        });

        db.on('load', () => {
          resolve({ errorEvent, emptyEvent });
        });
      });

      expect(result.errorEvent).toBe(true);
      expect(result.emptyEvent).toBe(false);
    } finally {
      try { fs.unlinkSync(dbFile); } catch (e) { /* ignore */ }
    }
  });
});