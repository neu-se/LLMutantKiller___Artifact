import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty read stream close event', () => {
  it('should emit read_close event when the read stream finishes loading', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create a pre-existing database file with some data
    fs.writeFileSync(dbPath, JSON.stringify({ key: 'foo', val: 'bar' }) + '\n', 'utf-8');

    const db = new Dirty(dbPath);

    db.once('load', () => {
      // After load, the read stream should close and emit 'read_close'
      db.once('read_close', () => {
        // Clean up
        db.close();
        db.once('write_close', () => {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        });
      });

      // Set a timeout to fail the test if read_close is never emitted
      setTimeout(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(new Error('read_close event was never emitted'));
      }, 2000);
    });
  });
});