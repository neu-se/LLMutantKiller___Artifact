import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with pending writes', () => {
  it('should fire write_close after close() is called while writes are pending', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const filePath = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(filePath);
    let timeoutHandle: ReturnType<typeof setTimeout>;

    db.on('load', () => {
      // Set values to create pending writes in the queue
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Call close immediately while writes are still pending in the queue.
      // Original code: this.once('drain', () => this.close()) — waits for drain, then closes properly
      // Mutated code: this.once("", () => this.close()) — listens on "" event which never fires,
      //               so the database never actually closes and write_close never fires
      db.close();

      timeoutHandle = setTimeout(() => {
        try {
          fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch (e) {
          // ignore cleanup errors
        }
        done(new Error('Timed out: write_close event never fired. close() did not complete properly.'));
      }, 3000);
    });

    db.once('write_close', () => {
      clearTimeout(timeoutHandle);
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (e) {
        // ignore cleanup errors
      }
      done();
    });
  });
});