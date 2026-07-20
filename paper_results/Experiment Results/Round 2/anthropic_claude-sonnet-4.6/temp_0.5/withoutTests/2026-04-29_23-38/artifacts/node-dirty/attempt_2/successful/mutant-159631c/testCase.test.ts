import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty read_close event', () => {
  it('should emit read_close event after loading an existing database file', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create a pre-existing database file with some data
    fs.writeFileSync(dbPath, JSON.stringify({ key: 'foo', val: 'bar' }) + '\n', 'utf-8');

    const db = new Dirty(dbPath);

    let readCloseFired = false;

    db.on('read_close', () => {
      readCloseFired = true;
    });

    db.on('load', () => {
      // After load, the read stream should close and emit read_close
      // Give it a moment for the close event to propagate
      setImmediate(() => {
        db.close();
        db.on('write_close', () => {
          try {
            fs.rmSync(tmpDir, { recursive: true, force: true });
          } catch (e) {
            // ignore cleanup errors
          }
          if (readCloseFired) {
            done();
          } else {
            done(new Error('read_close event was never emitted'));
          }
        });
      });
    });

    db.on('error', (err: Error) => {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (e) {
        // ignore cleanup errors
      }
      done(err);
    });
  });
});