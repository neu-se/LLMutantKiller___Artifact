import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as stream from 'stream';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty drain event', () => {
  it('drain fires exactly once after all writes complete', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-drain-once-${process.pid}.dirty`);
    try { fs.unlinkSync(tmpFile); } catch (_) {}

    const db = new Dirty(tmpFile);

    db.on('load', () => {
      // Replace _writeStream with a controlled stream that forces backpressure
      const oldStream = db._writeStream;
      oldStream.end();

      // Create a PassThrough with tiny highWaterMark to force backpressure
      const controlled = new stream.PassThrough({ highWaterMark: 1 });
      // Pipe to actual file
      const fileStream = fs.createWriteStream(tmpFile, { flags: 'a', encoding: 'utf-8' });
      controlled.pipe(fileStream);

      // Add cork/uncork methods expected by _flush
      db._writeStream = controlled as any;

      controlled.on('drain', () => {
        db._waitForDrain = false;
        if (!db._queue.size) {
          // no-op
        } else {
          if (db._inFlightWrites <= 0) db.emit('drain');
          db._flush();
        }
      });

      controlled.on('close', () => {
        db._writeStream = null;
        db.emit('write_close');
      });

      let drainCount = 0;
      db.on('drain', () => { drainCount++; });

      const NUM_KEYS = 20;
      let callbacksFired = 0;

      for (let i = 0; i < NUM_KEYS; i++) {
        db.set(`key${i}`, 'value'.repeat(10) + i, () => {
          callbacksFired++;
          if (callbacksFired === NUM_KEYS) {
            setImmediate(() => {
              try {
                expect(drainCount).toBe(1);
                try { fs.unlinkSync(tmpFile); } catch (_) {}
                done();
              } catch (e) {
                try { fs.unlinkSync(tmpFile); } catch (_) {}
                done(e);
              }
            });
          }
        });
      }
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(tmpFile); } catch (_) {}
      done(err);
    });
  });
});