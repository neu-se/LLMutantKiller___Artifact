import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty read_close event', () => {
  it('should emit read_close event when the read stream closes', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `test-dirty-${Date.now()}-${Math.floor(Math.random() * 10000)}.db`);

    // Create a test db file with some data
    fs.writeFileSync(dbPath, '{"key":"foo","val":"bar"}\n');

    const db = new Dirty(dbPath);

    let readCloseEmitted = false;

    db.on('read_close', () => {
      readCloseEmitted = true;
    });

    db.on('load', () => {
      // After load, the read stream should close and emit read_close
      // Give it a moment for the close event to propagate
      setTimeout(() => {
        try {
          expect(readCloseEmitted).toBe(true);
          // Cleanup
          db.close();
          db.on('write_close', () => {
            try { fs.unlinkSync(dbPath); } catch (e) {}
            done();
          });
        } catch (err) {
          try { fs.unlinkSync(dbPath); } catch (e) {}
          done(err);
        }
      }, 100);
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (e) {}
      done(err);
    });
  });
});