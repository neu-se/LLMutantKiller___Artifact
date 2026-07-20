import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with in-flight writes', () => {
  it('should emit drain before write_close when close is called with in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);
    const events: string[] = [];

    db.on('drain', () => events.push('drain'));
    db.on('write_close', () => {
      events.push('write_close');
      try {
        // In the original code, drain must happen before write_close
        // because close() waits for drain (via _inFlightWrites > 0 check)
        // before ending the write stream.
        // In the mutated code, close() ignores _inFlightWrites and ends
        // the stream immediately, so drain may not precede write_close.
        expect(events.indexOf('drain')).toBeLessThan(events.indexOf('write_close'));
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      } catch (err) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(err);
      }
    });

    db.on('load', () => {
      // Write data to create in-flight writes
      db.set('key1', { value: 'hello' });
      db.set('key2', { value: 'world' });

      // Use setImmediate to call close after _flush() has run
      // At this point _queue is empty but _inFlightWrites > 0
      setImmediate(() => {
        db.close();
      });
    });

    db.on('error', (err) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 10000);
});